# Color Typology Fashion Stylist

AI-powered color analysis and outfit generation app. Upload a face photo to discover your seasonal color type (one of 12 classifications), then get photorealistic outfit images styled to your palette.

## How It Works

1. **Analyze** — Upload a face photo. Gemini extracts skin, hair, eye, and lip colors; deterministic color science (CIE LAB, white balance correction, 3-axis scoring) matches you to one of 12 seasonal types. Or select your type manually.
2. **Upload** — Provide a full-body reference photo.
3. **Generate** — The app produces two outfit images (casual and smart casual) using your color palette, with 5 randomized preset outfits per style. Refine either outfit iteratively via chat.

### The 12 Types

| Spring | Summer | Autumn | Winter |
|--------|--------|--------|--------|
| 🌸 Light Spring | 🫧 Light Summer | 🍂 Soft Autumn | 🌑 Deep Winter |
| 🌷 True Spring | 🌊 True Summer | 🍁 True Autumn | ❄️ True Winter |
| 🌻 Bright Spring | 🌫️ Soft Summer | 🌰 Deep Autumn | 💎 Bright Winter |

Each type defines: 10 allowed colors (with hex values), forbidden colors, 5 casual outfits, 5 smart casual outfits, fabric suggestions, and a vibe description.

## Setup

```bash
npm install
cp config.js.example config.js
```

Edit `config.js` with your Google API key:

```js
module.exports = {
  GOOGLE_API_KEY: "your-key-here",
  ANALYSIS_MODEL: "gemini-3.1-flash-lite-preview",
  GENERATIVE_MODEL: "gemini-3.1-flash-image-preview",
};
```

## Run

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Backend** — Node.js, Express 5, Multer (file uploads)
- **Frontend** — Vanilla JS, Tailwind CSS (CDN)
- **AI** — Google Gemini API (`@google/genai`) for color extraction and image generation
- **Color Science** — Custom CIE LAB conversion, white balance correction, warmth/depth/chroma axis scoring, Euclidean season matching (all deterministic, no AI)

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/palettes` | All 12 season palettes |
| `POST` | `/api/analyze` | Extract colors from face photo, return matched type |
| `POST` | `/api/generate` | Generate outfit image from body photo + type + style |
| `POST` | `/api/refine` | Refine an outfit image with text feedback |

## Project Structure

```
├── server.js             Express API routes, Gemini calls
├── color-analysis.js     Lab color space math, white balance, season matching
├── color-palettes.js     12 season palettes, outfit presets, prompt builders
├── config.js             API key & model config (git-ignored)
├── config.js.example     Template for config.js
├── public/
│   ├── index.html        Three-step UI
│   └── app.js            Frontend logic, file uploads, chat refinement
└── _outputs/             Generated images (git-ignored)
```
