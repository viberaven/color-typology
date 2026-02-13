const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GOOGLE_API_KEY, GENERATIVE_MODEL, ANALYSIS_MODEL } = require("./config");
const { palettes, buildGenerationPrompt, buildRefinementPrompt } = require("./color-palettes");

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.static(path.join(__dirname, "public")));

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

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

    const typologyNames = Object.keys(palettes).join(", ");

    const analysisPrompt = `You are an expert color analyst trained in the 12-season personal color analysis system. Analyze this person's photo to determine their seasonal color typology.

VALID TYPOLOGIES: ${typologyNames}

ANALYSIS METHOD — evaluate these four dimensions systematically:

1. UNDERTONE (Warm vs Cool):
   - Warm: skin has golden, peachy, or yellow undertones; veins appear greenish
   - Cool: skin has pink, rosy, or bluish undertones; veins appear blue/purple
   - Look at the neck, jawline, and forehead where undertone is most visible

2. VALUE/DEPTH (Light vs Medium vs Deep):
   - Consider the OVERALL combination of hair color + skin tone + eye color
   - Light: fair skin, light hair (blonde, light brown, light red), light eyes
   - Deep: dark hair, medium-to-dark skin or high contrast dark features, dark eyes
   - Medium: falls between — neither strikingly light nor deep

3. CHROMA (Bright/Clear vs Soft/Muted):
   - Bright/Clear: high contrast between features, vivid eye color, clear skin
   - Soft/Muted: low contrast between features, blended or muted coloring, gentle transitions

4. SEASON MAPPING:
   - Spring (warm, light-to-medium, clear): Light Spring, True Spring, Bright Spring
   - Summer (cool, light-to-medium, soft): Light Summer, True Summer, Soft Summer
   - Autumn (warm, medium-to-deep, muted-to-rich): Soft Autumn, True Autumn, Deep Autumn
   - Winter (cool, medium-to-deep, clear/high-contrast): Deep Winter, True Winter, Bright Winter

KEY DISTINCTIONS:
   - Light Spring vs Light Summer: both light, but Spring is warm-toned, Summer is cool-toned
   - Soft Summer vs Soft Autumn: both muted, but Summer is cool, Autumn is warm
   - Deep Autumn vs Deep Winter: both deep, but Autumn is warm, Winter is cool
   - Bright Spring vs Bright Winter: both vivid, but Spring is warm, Winter is cool
   - "True" seasons are the most balanced expression of their season (not notably light, deep, soft, or bright)

Return ONLY a valid JSON object: {"typology": "<exact name from the list>", "reasoning": "<4-5 sentences explaining your undertone, value, and chroma observations, and why this maps to the chosen season>"}`;

    const analysisModel = genAI.getGenerativeModel({ model: ANALYSIS_MODEL });
    const result = await analysisModel.generateContent([
      { inlineData: { mimeType, data: base64Face } },
      { text: analysisPrompt },
    ]);

    const response = result.response;
    console.log("Analyze: requested=%s actual=%s", ANALYSIS_MODEL, response.modelVersion);
    const text = response.text().trim();
    // Extract JSON from the response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Failed to parse analysis response", raw: text });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate the typology name
    if (!palettes[parsed.typology]) {
      return res.status(500).json({ error: `Unknown typology: ${parsed.typology}`, raw: text });
    }

    const palette = palettes[parsed.typology];
    res.json({
      typology: parsed.typology,
      reasoning: parsed.reasoning,
      palette: {
        allowedColors: palette.allowedColors,
        forbiddenColors: palette.forbiddenColors,
        vibe: palette.vibe,
      },
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

    const model = genAI.getGenerativeModel({
      model: GENERATIVE_MODEL,
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    });

    const { mimeType, data: base64Data } = parseBase64Image(bodyPhoto);

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
      { text: prompt },
    ]);

    const response = result.response;
    console.log("Generate: requested=%s actual=%s", GENERATIVE_MODEL, response.modelVersion);

    if (!response.candidates || !response.candidates[0]?.content) {
      const reason = response.promptFeedback?.blockReason
        || response.candidates?.[0]?.finishReason
        || "unknown";
      console.error("Generate: no candidates returned, reason=%s", reason, JSON.stringify(response, null, 2));
      return res.status(500).json({ error: `Generation blocked or empty (reason: ${reason})` });
    }

    const parts = response.candidates[0].content.parts;

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

    const model = genAI.getGenerativeModel({
      model: GENERATIVE_MODEL,
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    });

    const base64Data = previousImage.replace(/^data:image\/\w+;base64,/, "");

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Data,
        },
      },
      { text: prompt },
    ]);

    const response = result.response;
    console.log("Refine: requested=%s actual=%s", GENERATIVE_MODEL, response.modelVersion);
    const parts = response.candidates[0].content.parts;

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
