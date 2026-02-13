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
    casualOutfits: [
      "Light wash denim jeans, a peach or warm pink cotton t-shirt, white canvas sneakers, and a soft gold pendant necklace",
      "Camel linen shorts, light aqua cotton polo shirt, ivory canvas slip-ons, and a warm pink beaded bracelet",
      "Ivory wide-leg trousers, light coral relaxed button-down shirt, camel suede sneakers, and a powder blue canvas tote bag",
      "Powder blue cotton joggers, peach oversized hoodie, light moss green canvas sneakers, and a soft gold cuff bracelet",
      "Light moss green chino pants, warm lavender crew-neck cotton tee, ivory leather sandals, and a camel woven belt",
    ],
    smartCasualOutfits: [
      "Ivory silk blouse tucked into camel tailored trousers, light coral ballet flats, delicate gold jewelry, and a light aqua structured handbag",
      "Peach linen blazer over a powder blue silk shell top, ivory tailored trousers, camel pointed-toe flats, and soft gold stud earrings",
      "Warm lavender midi wrap dress, camel leather slingback heels, soft gold pendant necklace, and a peach silk scarf",
      "Camel cashmere cardigan over a light coral fitted tee, light moss green tailored chinos, ivory loafers, and a powder blue structured clutch",
      "Soft gold satin blouse, warm pink pencil skirt, light aqua pointed-toe kitten heels, and peach drop earrings",
    ],
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
    casualOutfits: [
      "Bright coral cotton sundress, caramel leather sandals, turquoise beaded bracelet, and a warm white straw crossbody bag",
      "Warm yellow linen shorts, grass green cotton tank top, ivory canvas sneakers, and a tangerine woven belt",
      "Grass green cargo pants, bright coral graphic tee, caramel suede sneakers, and a turquoise pendant necklace",
      "Ivory cotton jumpsuit, tomato red leather sandals, warm yellow canvas tote bag, and a caramel cuff bracelet",
      "Caramel chino trousers, warm teal cotton henley, ivory slip-on sneakers, and a bright coral crossbody bag",
    ],
    smartCasualOutfits: [
      "Warm yellow tailored blazer over an ivory camisole, caramel wide-leg trousers, tomato red pointed-toe pumps, and gold hoop earrings",
      "Turquoise silk midi dress, caramel leather slingback heels, bright coral clutch, and warm yellow bangle bracelet",
      "Ivory linen suit separates, warm teal silk shell top, tangerine pointed-toe flats, and grass green enamel drop earrings",
      "Caramel leather pencil skirt, bright coral silk blouse, grass green kitten heels, and a warm yellow structured handbag",
      "Tomato red tailored blazer, warm white silk tee, turquoise tailored trousers, caramel loafers, and ivory pearl stud earrings",
    ],
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
    casualOutfits: [
      "White slim jeans, a hot pink graphic tee, bright yellow sneakers, and a coral crossbody bag",
      "Electric blue cotton shorts, white crew-neck tee, coral canvas sneakers, and a bright orange baseball cap",
      "Kelly green joggers, bright yellow oversized sweatshirt, white leather sneakers, and a warm navy woven belt",
      "Warm navy denim jeans, bright orange cotton polo shirt, white canvas slip-ons, and a hot pink silicone watch",
      "Coral linen wide-leg trousers, warm purple cotton tank top, white platform sandals, and an electric blue tote bag",
    ],
    smartCasualOutfits: [
      "Electric blue fitted blazer over a white silk top, warm navy slim trousers, true red heels, and bright geometric statement earrings",
      "Hot pink midi wrap dress, warm navy pointed-toe pumps, white structured clutch, and bright yellow bangle bracelet",
      "White tailored suit, coral silk camisole, kelly green pointed-toe flats, and warm purple drop earrings",
      "Warm navy pencil skirt, electric blue silk blouse, true red slingback heels, and a bright orange leather handbag",
      "Kelly green linen blazer, white fitted trousers, bright yellow silk scarf, warm navy loafers, and coral stud earrings",
    ],
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
    casualOutfits: [
      "Light periwinkle linen shorts, soft white cotton tee, rose beige espadrilles, and a dusty rose canvas tote",
      "Soft sage cotton joggers, powder pink hoodie, cool taupe canvas sneakers, and a pale blue woven bracelet",
      "Cool taupe chino pants, light mauve cotton button-down shirt, soft white canvas slip-ons, and a soft lavender crossbody bag",
      "Pale blue denim shorts, dusty rose relaxed tank top, rose beige leather sandals, and a soft sage linen tote bag",
      "Soft white linen wide-leg trousers, light periwinkle cotton polo shirt, cool taupe suede loafers, and a powder pink beaded necklace",
    ],
    smartCasualOutfits: [
      "Soft lavender wrap dress, cool taupe kitten heels, pearl stud earrings, and a pale blue structured clutch",
      "Rose beige linen blazer over a soft white silk camisole, light periwinkle tailored trousers, dusty rose pointed-toe flats, and silver pendant necklace",
      "Powder pink midi skirt, pale blue silk blouse, soft sage pointed-toe pumps, and light mauve drop earrings",
      "Cool taupe tailored suit separates, light mauve silk shell top, soft lavender loafers, and a dusty rose leather clutch",
      "Light periwinkle cashmere cardigan, soft white fitted tee, rose beige tailored chinos, pale blue ballet flats, and soft sage enamel bracelet",
    ],
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
    casualOutfits: [
      "Smoky blue relaxed chinos, rose cotton polo shirt, soft white sneakers, and a cocoa leather belt",
      "Dove gray cotton joggers, raspberry crew-neck sweatshirt, slate blue canvas sneakers, and a soft teal woven bracelet",
      "Cocoa linen shorts, smoky blue cotton henley, soft white leather sandals, and a rose crossbody bag",
      "Slate blue denim jeans, soft teal cotton tee, cocoa suede desert boots, and a dove gray canvas backpack",
      "Soft white wide-leg linen trousers, mauve relaxed button-down shirt, blue gray canvas slip-ons, and a cocoa leather watch",
    ],
    smartCasualOutfits: [
      "Slate blue tailored suit separates, mauve silk blouse, dove gray pointed-toe pumps, and silver pendant necklace",
      "Rose midi wrap dress, cocoa leather slingback heels, slate blue structured clutch, and smoky blue drop earrings",
      "Soft teal linen blazer over a soft white silk camisole, smoky blue tailored trousers, cocoa loafers, and dove gray pearl stud earrings",
      "Dove gray cashmere cardigan, raspberry silk shell top, slate blue pencil skirt, mauve pointed-toe flats, and a cocoa leather belt",
      "Cocoa tailored chinos, blue gray silk blouse, rose kitten heels, and a soft teal structured handbag",
    ],
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
    casualOutfits: [
      "Sage green linen trousers, oatmeal knit sweater, mushroom suede loafers, and a dusty teal woven scarf",
      "Soft denim blue cotton joggers, dusty pink oversized tee, oatmeal canvas sneakers, and a pewter watch",
      "Mushroom chino shorts, dusty teal cotton henley, oatmeal leather sandals, and a sage green canvas tote bag",
      "Oatmeal linen wide-leg trousers, muted rose relaxed button-down shirt, pewter suede slip-ons, and a smoky lavender crossbody bag",
      "Pewter cotton cargo pants, soft plum crew-neck sweatshirt, mushroom suede sneakers, and a dusty pink woven bracelet",
    ],
    smartCasualOutfits: [
      "Soft plum midi skirt, smoky lavender silk blouse, pewter ankle boots, and muted rose gold jewelry",
      "Mushroom linen blazer over an oatmeal silk camisole, sage green tailored trousers, dusty pink pointed-toe flats, and pewter pendant necklace",
      "Dusty teal wrap dress, mushroom leather slingback heels, smoky lavender clutch, and oatmeal pearl stud earrings",
      "Oatmeal cashmere turtleneck, soft denim blue tailored trousers, muted rose kitten heels, and a dusty teal structured handbag",
      "Sage green silk blouse, soft plum pencil skirt, mushroom loafers, and dusty pink drop earrings",
    ],
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
    casualOutfits: [
      "Khaki chino shorts, dusty salmon linen shirt, cream canvas sneakers, and a soft olive woven belt",
      "Warm taupe cotton joggers, terracotta crew-neck sweatshirt, cream leather slip-ons, and a muted teal woven bracelet",
      "Soft olive cargo pants, cream cotton henley, warm mushroom suede desert boots, and a dusty gold pendant necklace",
      "Cream wide-leg linen trousers, muted teal cotton polo shirt, khaki canvas sneakers, and a soft rust crossbody bag",
      "Warm mushroom linen shorts, soft rust relaxed button-down shirt, cream leather sandals, and a dusty salmon canvas tote bag",
    ],
    smartCasualOutfits: [
      "Warm taupe wool blazer, cream silk camisole, terracotta tailored trousers, dusty gold pendant earrings, and soft rust leather loafers",
      "Dusty salmon midi wrap dress, warm taupe leather slingback heels, dusty gold bangle bracelet, and a cream silk scarf",
      "Muted teal linen blazer over a cream silk shell top, khaki tailored trousers, soft rust pointed-toe flats, and warm mushroom structured clutch",
      "Cream cashmere turtleneck, soft olive pencil skirt, terracotta kitten heels, and dusty gold drop earrings",
      "Khaki tailored suit separates, dusty salmon silk blouse, warm taupe loafers, and a muted teal structured handbag",
    ],
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
    casualOutfits: [
      "Olive green cargo pants, pumpkin colored cotton henley, chocolate brown leather boots, and a bronze cuff bracelet",
      "Warm cream cotton joggers, burnt orange oversized sweatshirt, chocolate brown suede sneakers, and a mustard woven belt",
      "Forest green chino shorts, warm cream linen button-down shirt, bronze leather sandals, and a warm teal canvas tote bag",
      "Chocolate brown corduroy trousers, warm teal cotton polo shirt, warm cream canvas sneakers, and a rust leather crossbody bag",
      "Mustard linen wide-leg trousers, rust cotton crew-neck tee, olive green suede desert boots, and a bronze pendant necklace",
    ],
    smartCasualOutfits: [
      "Mustard corduroy blazer, warm cream turtleneck, rust tailored trousers, forest green suede loafers, and warm teal silk pocket square",
      "Burnt orange wrap dress, chocolate brown leather slingback heels, bronze statement earrings, and a warm cream silk scarf",
      "Forest green linen blazer over a warm cream silk camisole, olive green tailored trousers, pumpkin pointed-toe flats, and a mustard structured clutch",
      "Warm cream cashmere cardigan, warm teal silk shell top, chocolate brown tailored chinos, bronze loafers, and rust enamel drop earrings",
      "Olive green tailored suit separates, burnt orange silk blouse, chocolate brown leather belt, warm cream kitten heels, and a warm teal structured handbag",
    ],
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
    casualOutfits: [
      "Dark wash denim jeans, deep orange cotton sweater, espresso leather ankle boots, and a warm bronze watch",
      "Olive cargo pants, burgundy cotton henley, espresso suede desert boots, and a dark gold pendant necklace",
      "Warm ivory wide-leg linen trousers, dark tomato red relaxed tee, mahogany leather sandals, and a deep teal canvas tote bag",
      "Espresso corduroy trousers, deep teal cotton polo shirt, warm ivory canvas sneakers, and a warm bronze cuff bracelet",
      "Burgundy cotton joggers, warm ivory oversized sweatshirt, olive suede sneakers, and a deep orange crossbody bag",
    ],
    smartCasualOutfits: [
      "Burgundy velvet blazer, warm ivory silk blouse, olive tailored trousers, mahogany leather pointed-toe shoes, and dark gold statement earrings",
      "Deep teal wrap dress, espresso leather slingback heels, warm bronze bangle bracelet, and a warm ivory silk scarf",
      "Espresso tailored suit separates, dark tomato red silk camisole, deep orange pointed-toe flats, and dark gold drop earrings",
      "Warm ivory cashmere turtleneck, burgundy pencil skirt, olive kitten heels, and a deep teal structured clutch",
      "Dark gold silk blouse, mahogany tailored trousers, espresso leather loafers, and a burgundy structured handbag",
    ],
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
    casualOutfits: [
      "Black slim jeans, ruby red cotton crewneck, dark charcoal suede sneakers, and a dark navy canvas backpack",
      "Dark navy chino trousers, bright white cotton tee, black leather sneakers, and an emerald woven belt",
      "Dark charcoal joggers, deep purple oversized hoodie, black canvas slip-ons, and a ruby red crossbody bag",
      "Black cargo pants, dark teal cotton henley, dark charcoal suede desert boots, and a bright white canvas tote bag",
      "Emerald cotton shorts, bright white relaxed button-down shirt, black leather sandals, and a dark navy baseball cap",
    ],
    smartCasualOutfits: [
      "Dark navy tailored suit, bright white crisp shirt, emerald silk tie or scarf, deep purple leather clutch, and silver cufflinks",
      "Ruby red wrap dress, black pointed-toe stilettos, dark navy structured clutch, and deep burgundy drop earrings",
      "Deep purple velvet blazer over a bright white silk camisole, black tailored trousers, dark teal pointed-toe flats, and dark charcoal leather belt",
      "Black pencil skirt, icy pink silk blouse, emerald kitten heels, and a deep burgundy structured handbag",
      "Dark charcoal tailored suit separates, ruby red silk shell top, dark navy loafers, and emerald enamel stud earrings",
    ],
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
    casualOutfits: [
      "Charcoal straight-leg trousers, true blue cotton shirt, pure white sneakers, and a cool red crossbody bag",
      "Black slim jeans, hot pink crew-neck sweatshirt, charcoal canvas sneakers, and an icy blue woven bracelet",
      "True blue denim shorts, pure white cotton henley, black leather sandals, and an emerald green canvas tote bag",
      "Pure white wide-leg linen trousers, royal purple relaxed tee, charcoal suede slip-ons, and a cool red pendant necklace",
      "Charcoal cotton joggers, emerald green cotton polo shirt, pure white leather sneakers, and a hot pink crossbody bag",
    ],
    smartCasualOutfits: [
      "Royal purple wrap dress, icy violet stiletto heels, silver statement necklace, and a black structured handbag",
      "True blue tailored blazer over a pure white silk camisole, black tailored trousers, hot pink pointed-toe flats, and charcoal leather belt",
      "Charcoal pencil skirt, cool red silk blouse, black pointed-toe pumps, and icy violet drop earrings",
      "Black cashmere cardigan, icy blue silk shell top, charcoal tailored chinos, emerald green loafers, and pure white pearl stud earrings",
      "Emerald green midi wrap dress, black slingback heels, royal purple clutch, and icy blue bangle bracelet",
    ],
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
    casualOutfits: [
      "Black skinny jeans, fuchsia oversized knit sweater, white platform sneakers, and bright teal sunglasses",
      "White cotton shorts, vivid blue crew-neck tee, black canvas sneakers, and a lemon yellow crossbody bag",
      "Deep navy cargo pants, true red cotton hoodie, white leather slip-ons, and a bright green woven bracelet",
      "Black wide-leg joggers, bright teal cotton polo shirt, white canvas high-tops, and a fuchsia canvas tote bag",
      "Vivid blue denim jeans, electric purple relaxed button-down shirt, black suede sneakers, and a true red baseball cap",
    ],
    smartCasualOutfits: [
      "Vivid blue tailored blazer, white silk camisole, black fitted trousers, lemon yellow statement clutch, and electric purple drop earrings",
      "Fuchsia midi wrap dress, black pointed-toe stilettos, bright teal structured clutch, and white pearl stud earrings",
      "Deep navy tailored suit separates, true red silk blouse, white pointed-toe flats, and vivid blue enamel bangle bracelet",
      "White cashmere cardigan, bright green silk shell top, black pencil skirt, deep navy kitten heels, and fuchsia drop earrings",
      "Black tailored blazer, lemon yellow silk camisole, deep navy tailored trousers, electric purple pointed-toe pumps, and bright teal statement necklace",
    ],
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
  const outfits = style === "casual" ? palette.casualOutfits : palette.smartCasualOutfits;
  const outfit = outfits[Math.floor(Math.random() * outfits.length)];
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
