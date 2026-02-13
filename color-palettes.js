const palettes = {
  "Light Spring": {
    name: "Light Spring",
    allowedColors: [
      { name: "Peach", hex: "#FFCBA4" },
      { name: "Warm Pink", hex: "#F4A6C1" },
      { name: "Light Coral", hex: "#F08080" },
      { name: "Soft Gold", hex: "#F0D58C" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Light Aqua", hex: "#93E9D5" },
      { name: "Warm Lavender", hex: "#C3A6D8" },
      { name: "Camel", hex: "#C9A96E" },
      { name: "Light Moss", hex: "#A8C686" },
      { name: "Powder Blue", hex: "#B0D4E8" },
    ],
    forbiddenColors: ["Black", "Pure White", "Charcoal", "Dark Navy", "Burgundy", "Deep Purple", "Neon colors", "Fuchsia", "Cool Gray"],
    backgroundHex: "#FFF8F0",
    casualOutfit: "Light wash denim jeans, a peach or warm pink cotton t-shirt, white canvas sneakers, and a soft gold pendant necklace",
    smartCasualOutfit: "Ivory silk blouse tucked into camel tailored trousers, light coral ballet flats, delicate gold jewelry, and a light aqua structured handbag",
    fabricSuggestions: ["Light cotton", "Linen", "Silk", "Chiffon", "Light knits"],
    vibe: "Fresh, warm, and delicate — like early morning spring sunlight",
  },

  "True Spring": {
    name: "True Spring",
    allowedColors: [
      { name: "Bright Coral", hex: "#FF6F61" },
      { name: "Warm Yellow", hex: "#FFD700" },
      { name: "Tangerine", hex: "#FF9944" },
      { name: "Grass Green", hex: "#7CCD7C" },
      { name: "Turquoise", hex: "#40E0D0" },
      { name: "Tomato Red", hex: "#E55B3C" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Caramel", hex: "#C68E3F" },
      { name: "Warm Teal", hex: "#2E9E8E" },
      { name: "Warm White", hex: "#FDF5E6" },
    ],
    forbiddenColors: ["Black", "Pure White", "Cool Gray", "Dusty Rose", "Burgundy", "Muted tones", "Fuchsia", "Icy Blue"],
    backgroundHex: "#FFF9E6",
    casualOutfit: "Bright coral cotton sundress, tan leather sandals, turquoise beaded bracelet, and a straw crossbody bag",
    smartCasualOutfit: "Warm yellow tailored blazer over an ivory camisole, caramel wide-leg trousers, tomato red pointed-toe pumps, and gold hoop earrings",
    fabricSuggestions: ["Crisp cotton", "Poplin", "Light denim", "Linen blends", "Smooth leather"],
    vibe: "Vibrant, warm, and energetic — like a sunlit garden in full bloom",
  },

  "Bright Spring": {
    name: "Bright Spring",
    allowedColors: [
      { name: "Hot Pink", hex: "#FF69B4" },
      { name: "Electric Blue", hex: "#007FFF" },
      { name: "Bright Orange", hex: "#FF7F00" },
      { name: "Kelly Green", hex: "#4CBB17" },
      { name: "Bright Yellow", hex: "#FFE135" },
      { name: "True Red", hex: "#E60026" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "Warm Purple", hex: "#9B59B6" },
      { name: "Warm Navy", hex: "#1E3A6D" },
    ],
    forbiddenColors: ["Muted tones", "Dusty colors", "Olive", "Taupe", "Beige", "Burgundy", "Charcoal", "Forest Green"],
    backgroundHex: "#F5F5FF",
    casualOutfit: "White slim jeans, a hot pink graphic tee, bright yellow sneakers, and a coral crossbody bag",
    smartCasualOutfit: "Electric blue fitted blazer over a white silk top, black slim trousers, true red heels, and bright geometric statement earrings",
    fabricSuggestions: ["Crisp cotton", "Silk", "Patent leather", "Structured fabrics", "Sateen"],
    vibe: "Bold, clear, and striking — like tropical flowers against a bright sky",
  },

  "Light Summer": {
    name: "Light Summer",
    allowedColors: [
      { name: "Powder Pink", hex: "#F0C4D4" },
      { name: "Soft Lavender", hex: "#C5ABD6" },
      { name: "Light Periwinkle", hex: "#A4B8D4" },
      { name: "Dusty Rose", hex: "#D4A0A0" },
      { name: "Soft Sage", hex: "#A8BFA0" },
      { name: "Light Mauve", hex: "#D4A0C0" },
      { name: "Pale Blue", hex: "#B0C4DE" },
      { name: "Cool Taupe", hex: "#C0B0A0" },
      { name: "Soft White", hex: "#F0EDE8" },
      { name: "Rose Beige", hex: "#D8C0B0" },
    ],
    forbiddenColors: ["Black", "Pure White", "Bright Orange", "Warm Yellow", "Hot Pink", "Dark Brown", "Gold"],
    backgroundHex: "#F0EDF5",
    casualOutfit: "Light periwinkle linen shorts, soft white cotton tee, rose beige espadrilles, and a dusty rose canvas tote",
    smartCasualOutfit: "Soft lavender wrap dress, cool taupe kitten heels, pearl stud earrings, and a pale blue structured clutch",
    fabricSuggestions: ["Soft cotton", "Linen", "Cashmere", "Chiffon", "Light wool"],
    vibe: "Soft, cool, and ethereal — like a misty morning by the sea",
  },

  "True Summer": {
    name: "True Summer",
    allowedColors: [
      { name: "Slate Blue", hex: "#6A8EAE" },
      { name: "Rose", hex: "#C87088" },
      { name: "Soft Teal", hex: "#6EA0A0" },
      { name: "Mauve", hex: "#B07090" },
      { name: "Cocoa", hex: "#8B6A60" },
      { name: "Smoky Blue", hex: "#7090A0" },
      { name: "Soft White", hex: "#ECE8E0" },
      { name: "Raspberry", hex: "#B03060" },
      { name: "Blue Gray", hex: "#8098A0" },
      { name: "Dove Gray", hex: "#A0A0A0" },
    ],
    forbiddenColors: ["Bright Orange", "Warm Yellow", "Black", "Pure White", "Lime Green", "Gold", "Warm Brown", "Coral"],
    backgroundHex: "#EDE8EF",
    casualOutfit: "Smoky blue relaxed chinos, rose cotton polo shirt, soft white sneakers, and a cocoa leather belt",
    smartCasualOutfit: "Slate blue tailored suit separates, mauve silk blouse, dove gray pointed-toe pumps, and silver pendant necklace",
    fabricSuggestions: ["Matte cotton", "Soft denim", "Jersey", "Matte silk", "Brushed wool"],
    vibe: "Balanced, cool, and composed — like a calm overcast summer day",
  },

  "Soft Summer": {
    name: "Soft Summer",
    allowedColors: [
      { name: "Dusty Teal", hex: "#6B8E8E" },
      { name: "Soft Plum", hex: "#8E6B8E" },
      { name: "Muted Rose", hex: "#B8878B" },
      { name: "Sage Green", hex: "#87A087" },
      { name: "Pewter", hex: "#8E8E8E" },
      { name: "Smoky Lavender", hex: "#9088A0" },
      { name: "Mushroom", hex: "#A09888" },
      { name: "Soft Denim Blue", hex: "#7888A0" },
      { name: "Oatmeal", hex: "#D8D0C0" },
      { name: "Dusty Pink", hex: "#C0A0A0" },
    ],
    forbiddenColors: ["Bright Red", "Neon colors", "Black", "Bright White", "Orange", "Warm Brown", "Mustard", "Hot Pink"],
    backgroundHex: "#EAE6E0",
    casualOutfit: "Sage green linen trousers, oatmeal knit sweater, mushroom suede loafers, and a dusty teal woven scarf",
    smartCasualOutfit: "Soft plum midi skirt, smoky lavender silk blouse, pewter ankle boots, and muted rose gold jewelry",
    fabricSuggestions: ["Brushed cotton", "Suede", "Cashmere", "Matte jersey", "Soft linen"],
    vibe: "Muted, gentle, and understated — like a watercolor painting in soft tones",
  },

  "Soft Autumn": {
    name: "Soft Autumn",
    allowedColors: [
      { name: "Warm Taupe", hex: "#A08878" },
      { name: "Dusty Gold", hex: "#C0A868" },
      { name: "Soft Olive", hex: "#8A8A60" },
      { name: "Terracotta", hex: "#C07050" },
      { name: "Warm Mushroom", hex: "#B0A090" },
      { name: "Muted Teal", hex: "#608080" },
      { name: "Soft Rust", hex: "#B07858" },
      { name: "Cream", hex: "#F0E8D8" },
      { name: "Dusty Salmon", hex: "#C89888" },
      { name: "Khaki", hex: "#A0986C" },
    ],
    forbiddenColors: ["Bright Pink", "Bright White", "Neon colors", "Black", "Cool Gray", "Icy Blue"],
    backgroundHex: "#F0EAE0",
    casualOutfit: "Khaki chino shorts, dusty salmon linen shirt, cream canvas sneakers, and a soft olive woven belt",
    smartCasualOutfit: "Warm taupe wool blazer, cream silk camisole, terracotta tailored trousers, dusty gold pendant earrings, and soft rust leather loafers",
    fabricSuggestions: ["Soft wool", "Brushed cotton", "Suede", "Matte silk", "Linen blends"],
    vibe: "Warm, earthy, and approachable — like golden light through autumn leaves",
  },

  "True Autumn": {
    name: "True Autumn",
    allowedColors: [
      { name: "Burnt Orange", hex: "#CC5500" },
      { name: "Olive Green", hex: "#6B6B2B" },
      { name: "Mustard", hex: "#D4A017" },
      { name: "Chocolate Brown", hex: "#5C3317" },
      { name: "Rust", hex: "#B7410E" },
      { name: "Warm Teal", hex: "#007868" },
      { name: "Warm Cream", hex: "#F5E6CA" },
      { name: "Pumpkin", hex: "#E87040" },
      { name: "Forest Green", hex: "#3A5A3A" },
      { name: "Bronze", hex: "#A07030" },
    ],
    forbiddenColors: ["Black", "Pure White", "Cool Pink", "Icy Blue", "Lavender", "Silver Gray", "Neon colors"],
    backgroundHex: "#F0E4D0",
    casualOutfit: "Olive green cargo pants, pumpkin colored cotton henley, chocolate brown leather boots, and a bronze cuff bracelet",
    smartCasualOutfit: "Mustard corduroy blazer, warm cream turtleneck, rust tailored trousers, forest green suede loafers, and warm teal silk pocket square",
    fabricSuggestions: ["Corduroy", "Leather", "Tweed", "Heavy cotton", "Suede", "Flannel"],
    vibe: "Rich, warm, and grounded — like a harvest table with autumn abundance",
  },

  "Deep Autumn": {
    name: "Deep Autumn",
    allowedColors: [
      { name: "Espresso", hex: "#3C1414" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Deep Teal", hex: "#005050" },
      { name: "Olive", hex: "#556B2F" },
      { name: "Dark Tomato Red", hex: "#A02020" },
      { name: "Warm Bronze", hex: "#8B6914" },
      { name: "Deep Orange", hex: "#C04000" },
      { name: "Dark Gold", hex: "#B8860B" },
      { name: "Mahogany", hex: "#6A2C2C" },
      { name: "Warm Ivory", hex: "#F0E8D0" },
    ],
    forbiddenColors: ["Pastel colors", "Cool Pink", "Icy Blue", "Bright White", "Silver", "Neon colors"],
    backgroundHex: "#E8E0D0",
    casualOutfit: "Dark wash denim jeans, deep orange cotton sweater, espresso leather ankle boots, and a warm bronze watch",
    smartCasualOutfit: "Burgundy velvet blazer, warm ivory silk blouse, olive tailored trousers, mahogany leather pointed-toe shoes, and dark gold statement earrings",
    fabricSuggestions: ["Velvet", "Leather", "Heavy silk", "Wool", "Cashmere", "Dark denim"],
    vibe: "Luxurious, deep, and intense — like a dimly lit library with mahogany bookshelves",
  },

  "Deep Winter": {
    name: "Deep Winter",
    allowedColors: [
      { name: "Black", hex: "#000000" },
      { name: "Ruby Red", hex: "#CC0033" },
      { name: "Dark Navy", hex: "#0A0A40" },
      { name: "Emerald", hex: "#006B3C" },
      { name: "Bright White", hex: "#FFFFFF" },
      { name: "Deep Purple", hex: "#4B0082" },
      { name: "Dark Charcoal", hex: "#2A2A2A" },
      { name: "Icy Pink", hex: "#F2D0DC" },
      { name: "Deep Burgundy", hex: "#600020" },
      { name: "Dark Teal", hex: "#005058" },
    ],
    forbiddenColors: ["Pastel colors", "Warm Orange", "Camel", "Peach", "Muted tones", "Mustard", "Coral", "Cream"],
    backgroundHex: "#E0E0E8",
    casualOutfit: "Black slim jeans, ruby red cotton crewneck, dark charcoal suede sneakers, and a dark navy canvas backpack",
    smartCasualOutfit: "Dark navy tailored suit, bright white crisp shirt, emerald silk tie or scarf, deep purple leather clutch, and silver cufflinks",
    fabricSuggestions: ["Crisp cotton", "Structured wool", "Satin", "Patent leather", "Silk"],
    vibe: "Powerful, dramatic, and high-contrast — like a starlit night sky",
  },

  "True Winter": {
    name: "True Winter",
    allowedColors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "True Blue", hex: "#0040C0" },
      { name: "Hot Pink", hex: "#FF1493" },
      { name: "Emerald Green", hex: "#008040" },
      { name: "Icy Violet", hex: "#C8B8E8" },
      { name: "Cool Red", hex: "#D00030" },
      { name: "Royal Purple", hex: "#6A0DAD" },
      { name: "Charcoal", hex: "#333333" },
      { name: "Icy Blue", hex: "#B0D4F1" },
    ],
    forbiddenColors: ["Warm Orange", "Gold", "Camel", "Salmon", "Muted earth tones", "Beige", "Mustard", "Rust"],
    backgroundHex: "#E8E8F0",
    casualOutfit: "Charcoal straight-leg trousers, true blue cotton shirt, pure white sneakers, and a cool red crossbody bag",
    smartCasualOutfit: "Royal purple wrap dress, icy violet stiletto heels, silver statement necklace, and a black structured handbag",
    fabricSuggestions: ["Silk", "Satin", "Crisp cotton", "Leather", "High-gloss fabrics"],
    vibe: "Sharp, icy, and glamorous — like a crystal-clear winter morning",
  },

  "Bright Winter": {
    name: "Bright Winter",
    allowedColors: [
      { name: "Fuchsia", hex: "#FF00FF" },
      { name: "Bright Teal", hex: "#00CED1" },
      { name: "Vivid Blue", hex: "#0066FF" },
      { name: "Lemon Yellow", hex: "#FFF44F" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Bright Green", hex: "#00CC44" },
      { name: "True Red", hex: "#E00030" },
      { name: "Deep Navy", hex: "#000080" },
      { name: "Electric Purple", hex: "#8B00FF" },
    ],
    forbiddenColors: ["Muted tones", "Dusty colors", "Beige", "Taupe", "Warm brown", "Olive", "Camel", "Mustard"],
    backgroundHex: "#F0F0F8",
    casualOutfit: "Black skinny jeans, fuchsia oversized knit sweater, white platform sneakers, and bright teal sunglasses",
    smartCasualOutfit: "Vivid blue tailored blazer, white silk camisole, black fitted trousers, lemon yellow statement clutch, and electric purple drop earrings",
    fabricSuggestions: ["High-sheen fabrics", "Silk", "Satin", "Patent leather", "Crisp cotton"],
    vibe: "Electric, high-contrast, and show-stopping — like neon lights against a dark sky",
  },
};

function buildGenerationPrompt(typologyName, style) {
  const palette = palettes[typologyName];
  if (!palette) return null;

  const colorList = palette.allowedColors
    .map((c) => `${c.name} (${c.hex})`)
    .join(", ");
  const forbidden = palette.forbiddenColors.join(", ");
  const outfit = style === "casual" ? palette.casualOutfit : palette.smartCasualOutfit;
  const styleLabel = style === "casual" ? "Casual" : "Smart Casual";

  return `Generate a photorealistic full-body fashion photo of this person wearing a new ${styleLabel.toLowerCase()} outfit.

IDENTITY PRESERVATION (HIGHEST PRIORITY):
- The person MUST be the SAME person from the reference photo — immediately recognizable
- Copy their EXACT face: bone structure, eye shape/color, nose, mouth, jawline, skin tone, facial hair, wrinkles, freckles, moles
- Copy their EXACT hair: color, style, length, texture, parting
- Copy their EXACT body: shape, height, proportions, build
- Do NOT beautify, slim, age, de-age, or alter ANY physical feature
- If the person wears glasses in the reference, keep the glasses

OUTFIT — ${styleLabel} style, "${palette.name}" color typology:
${outfit}
- Adapt the outfit to the person's apparent gender. For men: no earrings, no jewelry beyond a watch or simple bracelet, no exposed chest — always include a proper top. For women: feminine accessories and styling are fine.
- Each garment should be clearly one of the allowed colors below — not an in-between shade

COLOR RULES (STRICT):
- ALLOWED colors only: ${colorList}
- FORBIDDEN colors (do not use anywhere in clothing or accessories): ${forbidden}
- Every visible garment and accessory must match one of the allowed color hex values closely

FABRIC & TEXTURE: ${palette.fabricSuggestions.join(", ")} — show realistic fabric texture, weave, and natural draping/folds

PHOTOGRAPHY DIRECTION:
- Background: clean, solid ${palette.backgroundHex} — no props, no scenery
- Framing: full body, head to toe, centered, slight space above head and below feet
- Pose: natural, relaxed standing pose — weight slightly shifted, arms at sides or one hand in pocket
- Lighting: soft diffused studio lighting, subtle shadows for depth, no harsh highlights
- Camera: shot at roughly 85mm equivalent, eye level, shallow depth of field on background only
- Quality: high resolution, sharp focus on the person, professional fashion photography look

VIBE: ${palette.vibe}`;
}

function buildRefinementPrompt(typologyName, userRefinement) {
  const palette = palettes[typologyName];
  if (!palette) return null;

  const colorList = palette.allowedColors
    .map((c) => `${c.name} (${c.hex})`)
    .join(", ");
  const forbidden = palette.forbiddenColors.join(", ");

  return `Modify this fashion outfit photo. The user wants: "${userRefinement}"

IDENTITY PRESERVATION (HIGHEST PRIORITY):
- The person MUST remain the EXACT same person — same face, same hair, same body, same skin tone
- Do NOT change, beautify, slim, age, or alter ANY physical feature
- If the person wears glasses, keep them

WHAT TO CHANGE:
- ONLY modify what the user explicitly requested above
- Everything else stays identical: same pose, same lighting, same background, same camera angle, same garments not mentioned in the request

COLOR RULES ("${palette.name}" typology — still enforced):
- ALLOWED colors only: ${colorList}
- FORBIDDEN colors: ${forbidden}
- Any new or changed garments must use allowed colors only

QUALITY:
- The modified area must blend seamlessly with the rest of the image
- Maintain the same photorealistic quality, fabric texture, and lighting consistency
- Adapt clothing to the person's apparent gender (e.g. no earrings or exposed chest for men)`;
}

module.exports = { palettes, buildGenerationPrompt, buildRefinementPrompt };
