const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");
const { GOOGLE_API_KEY, GENERATIVE_MODEL, ANALYSIS_MODEL } = require("./config");
const { palettes, buildGenerationPrompt, buildRefinementPrompt } = require("./color-palettes");
const { validateExtraction, analyzeColors } = require("./color-analysis");

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.static(path.join(__dirname, "public")));

const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

console.log("Models:", { ANALYSIS_MODEL, GENERATIVE_MODEL });

function parseBase64Image(input) {
  const dataUrlMatch = input.match(/^data:(image\/\w+);base64,(.+)$/);
  if (dataUrlMatch) {
    return { mimeType: dataUrlMatch[1], data: dataUrlMatch[2] };
  }
  const header = Buffer.from(input.substring(0, 16), "base64");
  let mimeType = "image/jpeg";
  if (header[0] === 0x89 && header[1] === 0x50) mimeType = "image/png";
  else if (header[0] === 0x52 && header[1] === 0x49) mimeType = "image/webp";
  else if (header[0] === 0x47 && header[1] === 0x49) mimeType = "image/gif";
  return { mimeType, data: input };
}

// Return all palette names (for typology override dropdown)
app.get("/api/palettes", (req, res) => {
  const data = {};
  for (const [name, palette] of Object.entries(palettes)) {
    data[name] = {
      allowedColors: palette.allowedColors,
      forbiddenColors: palette.forbiddenColors,
      vibe: palette.vibe,
    };
  }
  res.json(data);
});

// Analyze face photo to determine color typology
app.post("/api/analyze", upload.single("face"), async (req, res) => {
  try {
    const faceBuffer = req.file
      ? req.file.buffer
      : req.body.face
        ? Buffer.from(req.body.face, "base64")
        : null;

    if (!faceBuffer) {
      return res.status(400).json({ error: "No face photo provided" });
    }

    let mimeType, base64Face;
    if (req.file) {
      base64Face = req.file.buffer.toString("base64");
      mimeType = req.file.mimetype;
    } else {
      ({ mimeType, data: base64Face } = parseBase64Image(req.body.face));
    }

    // Step 1: Ask Gemini to extract raw hex colors from face regions
    const extractionPrompt = `You are a color sampling tool. Look at this face photo and report the literal visible color of each region listed below as a hex value.

CRITICAL: Report the ACTUAL color you see in the photo, INCLUDING any lighting cast (warm/cool tint from ambient light). Do NOT attempt to correct for lighting or guess the "true" color — just sample what is visible.

Sample these 9 regions and return a JSON object:
- skin_forehead: center of forehead
- skin_cheek: fullest part of one cheek
- skin_neck: front of neck (or "N/A" if not visible)
- skin_jawline: along the jawline (or "N/A" if not visible)
- hair: mid-shaft of hair (or "N/A" if bald/shaved/not visible)
- eye_iris: the iris color of one eye
- eye_sclera: the white of one eye (important for calibration)
- lip: natural lip color (center of lower lip)
- eyebrow: eyebrow hair color

Return ONLY a JSON object with these 9 keys. Each value must be a hex color like "#A1B2C3" or "N/A" if the region is not visible. No other text.`;

    const result = await ai.models.generateContent({
      model: ANALYSIS_MODEL,
      contents: [
        { inlineData: { mimeType, data: base64Face } },
        { text: extractionPrompt },
      ],
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
      },
    });

    console.log("Extract: model=%s tokens=%j", ANALYSIS_MODEL, result.usageMetadata);
    let text = result.text.trim();

    // Parse JSON (handle markdown wrapping as fallback)
    let extracted;
    try {
      extracted = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return res.status(500).json({ error: "Failed to parse extraction response", raw: text });
      }
      extracted = JSON.parse(jsonMatch[0]);
    }

    // Step 2: Validate extraction
    const errors = validateExtraction(extracted);
    if (errors.length) {
      return res.status(500).json({ error: "Color extraction incomplete", details: errors, raw: extracted });
    }

    // Step 3: Run deterministic analysis pipeline
    const analysis = analyzeColors(extracted);

    // Validate the typology name against known palettes
    if (!palettes[analysis.typology]) {
      return res.status(500).json({ error: `Unknown typology: ${analysis.typology}`, _debug: analysis._debug });
    }

    const palette = palettes[analysis.typology];
    res.json({
      typology: analysis.typology,
      reasoning: analysis.reasoning,
      palette: {
        allowedColors: palette.allowedColors,
        forbiddenColors: palette.forbiddenColors,
        vibe: palette.vibe,
      },
      _debug: analysis._debug,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Generate outfit image with Gemini
app.post("/api/generate", async (req, res) => {
  try {
    const { bodyPhoto, typology, style } = req.body;

    if (!bodyPhoto || !typology || !style) {
      return res.status(400).json({ error: "Missing bodyPhoto, typology, or style" });
    }

    const prompt = buildGenerationPrompt(typology, style);
    if (!prompt) {
      return res.status(400).json({ error: `Unknown typology: ${typology}` });
    }

    const { mimeType, data: base64Data } = parseBase64Image(bodyPhoto);

    const result = await ai.models.generateContent({
      model: GENERATIVE_MODEL,
      contents: [
        { inlineData: { mimeType, data: base64Data } },
        { text: prompt },
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 1.0,
      },
    });

    console.log("Generate: model=%s tokens=%j", GENERATIVE_MODEL, result.usageMetadata);

    if (!result.candidates || !result.candidates[0]?.content) {
      const reason = result.promptFeedback?.blockReason
        || result.candidates?.[0]?.finishReason
        || "unknown";
      console.error("Generate: no candidates returned, reason=%s", reason, JSON.stringify(result, null, 2));
      return res.status(500).json({ error: `Generation blocked or empty (reason: ${reason})` });
    }

    const parts = result.candidates[0].content.parts;

    let imageData = null;
    let textResponse = "";

    for (const part of parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data;
      }
      if (part.text) {
        textResponse = part.text;
      }
    }

    if (!imageData) {
      return res.status(500).json({ error: "No image generated", text: textResponse });
    }

    res.json({ image: imageData, text: textResponse });
  } catch (err) {
    console.error("Generate error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Refine an existing outfit image
app.post("/api/refine", async (req, res) => {
  try {
    const { previousImage, typology, refinement } = req.body;

    if (!previousImage || !typology || !refinement) {
      return res.status(400).json({ error: "Missing previousImage, typology, or refinement" });
    }

    const prompt = buildRefinementPrompt(typology, refinement);
    if (!prompt) {
      return res.status(400).json({ error: `Unknown typology: ${typology}` });
    }

    const base64Data = previousImage.replace(/^data:image\/\w+;base64,/, "");

    const result = await ai.models.generateContent({
      model: GENERATIVE_MODEL,
      contents: [
        { inlineData: { mimeType: "image/png", data: base64Data } },
        { text: prompt },
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 1.0,
      },
    });

    console.log("Refine: model=%s tokens=%j", GENERATIVE_MODEL, result.usageMetadata);
    const parts = result.candidates[0].content.parts;

    let imageData = null;
    let textResponse = "";

    for (const part of parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data;
      }
      if (part.text) {
        textResponse = part.text;
      }
    }

    if (!imageData) {
      return res.status(500).json({ error: "No image generated", text: textResponse });
    }

    res.json({ image: imageData, text: textResponse });
  } catch (err) {
    console.error("Refine error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, HOST, () => {
  console.log(`Color Typology server running on http://${HOST}:${PORT}`);
});
