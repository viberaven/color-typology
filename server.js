const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ANTHROPIC_API_KEY, GOOGLE_API_KEY, CLAUDE_MODEL, GEMINI_MODEL } = require("./config");
const { palettes, buildGenerationPrompt, buildRefinementPrompt } = require("./color-palettes");

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.static(path.join(__dirname, "public")));

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

console.log("Models:", { CLAUDE_MODEL, GEMINI_MODEL });

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

// Analyze face photo with Claude to determine color typology
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

    const base64Face = faceBuffer.toString("base64");
    const mimeType = req.file ? req.file.mimetype : "image/jpeg";

    const typologyNames = Object.keys(palettes).join(", ");

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mimeType, data: base64Face },
            },
            {
              type: "text",
              text: `Analyze this person's face photo. Determine their seasonal color typology from the 12-season system: ${typologyNames}. Consider skin undertone (warm/cool/neutral), hair color, eye color, and overall contrast level (low/medium/high). Return ONLY a valid JSON object with no additional text: {"typology": "<exact type name from the list>", "reasoning": "<brief 2-3 sentence explanation of your analysis>"}`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].text.trim();
    // Extract JSON from the response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Failed to parse Claude response", raw: text });
    }

    const result = JSON.parse(jsonMatch[0]);

    // Validate the typology name
    if (!palettes[result.typology]) {
      return res.status(500).json({ error: `Unknown typology: ${result.typology}`, raw: text });
    }

    const palette = palettes[result.typology];
    res.json({
      typology: result.typology,
      reasoning: result.reasoning,
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
      model: GEMINI_MODEL,
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    });

    // Strip data URL prefix if present
    const base64Data = bodyPhoto.replace(/^data:image\/\w+;base64,/, "");

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data,
        },
      },
      { text: prompt },
    ]);

    const response = result.response;
    console.log("Generate: requested=%s actual=%s", GEMINI_MODEL, response.modelVersion);
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
      model: GEMINI_MODEL,
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
    console.log("Refine: requested=%s actual=%s", GEMINI_MODEL, response.modelVersion);
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
app.listen(PORT, () => {
  console.log(`Color Typology server running on http://localhost:${PORT}`);
});
