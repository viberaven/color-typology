// Pure-function color analysis module — zero dependencies
// Converts AI-extracted hex colors → Lab, corrects white balance,
// scores 3 axes (warmth, depth, chroma), matches to 12-season profiles.

// ─── Color space conversions ────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace(/^#/, "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToXyz(r, g, b) {
  // sRGB → linear → CIE XYZ (D65 illuminant)
  let rl = r / 255, gl = g / 255, bl = b / 255;
  rl = rl > 0.04045 ? Math.pow((rl + 0.055) / 1.055, 2.4) : rl / 12.92;
  gl = gl > 0.04045 ? Math.pow((gl + 0.055) / 1.055, 2.4) : gl / 12.92;
  bl = bl > 0.04045 ? Math.pow((bl + 0.055) / 1.055, 2.4) : bl / 12.92;
  rl *= 100; gl *= 100; bl *= 100;
  return {
    x: rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375,
    y: rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750,
    z: rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041,
  };
}

function xyzToLab(x, y, z) {
  // D65 reference white
  const Xn = 95.047, Yn = 100.0, Zn = 108.883;
  let fx = x / Xn, fy = y / Yn, fz = z / Zn;
  const e = 0.008856, k = 903.3;
  fx = fx > e ? Math.cbrt(fx) : (k * fx + 16) / 116;
  fy = fy > e ? Math.cbrt(fy) : (k * fy + 16) / 116;
  fz = fz > e ? Math.cbrt(fz) : (k * fz + 16) / 116;
  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function hexToLab(hex) {
  const { r, g, b: bl } = hexToRgb(hex);
  const { x, y, z } = rgbToXyz(r, g, bl);
  return xyzToLab(x, y, z);
}

// ─── White balance correction ───────────────────────────────────────

function chroma(lab) {
  return Math.sqrt(lab.a * lab.a + lab.b * lab.b);
}

function isScleraReliable(scleraLab) {
  return scleraLab.L > 60 && chroma(scleraLab) < 25;
}

function computeWhiteBalanceShift(scleraLab) {
  // Sclera should be neutral (a*≈0, b*≈0) — any deviation = lighting bias
  return {
    da: scleraLab.a,
    db: scleraLab.b,
    exposureRatio: scleraLab.L > 0 ? 90 / scleraLab.L : 1, // target L*≈90 for sclera
  };
}

function computeFallbackShift(rawLabs) {
  // Median-face-color approach with dampened 0.5x correction
  const sorted = (arr) => [...arr].sort((a, b) => a - b);
  const median = (arr) => {
    const s = sorted(arr);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  };
  const medA = median(rawLabs.map((l) => l.a));
  const medB = median(rawLabs.map((l) => l.b));
  // Typical skin has slight positive a* and b*; assume median bias ≈ half lighting
  return {
    da: medA * 0.5,
    db: medB * 0.5,
    exposureRatio: 1, // no exposure correction without reliable reference
  };
}

function correctColor(lab, shift) {
  return {
    L: Math.max(0, Math.min(100, lab.L * shift.exposureRatio)),
    a: lab.a - shift.da,
    b: lab.b - shift.db,
  };
}

// ─── Feature processing ────────────────────────────────────────────

function averageLab(labArray) {
  if (!labArray.length) return { L: 50, a: 0, b: 0 };
  const sum = labArray.reduce(
    (acc, l) => ({ L: acc.L + l.L, a: acc.a + l.a, b: acc.b + l.b }),
    { L: 0, a: 0, b: 0 }
  );
  const n = labArray.length;
  return { L: sum.L / n, a: sum.a / n, b: sum.b / n };
}

function getEffectiveHairLab(hairLab, eyebrowLab) {
  // If hair is null/N/A (bald), use eyebrow
  if (!hairLab) return eyebrowLab;
  if (!eyebrowLab) return hairLab;
  // If L* differs by >25 → likely dyed hair; blend 60% eyebrow + 40% hair
  if (Math.abs(hairLab.L - eyebrowLab.L) > 25) {
    return {
      L: eyebrowLab.L * 0.6 + hairLab.L * 0.4,
      a: eyebrowLab.a * 0.6 + hairLab.a * 0.4,
      b: eyebrowLab.b * 0.6 + hairLab.b * 0.4,
    };
  }
  return hairLab;
}

// ─── Three-axis scoring ─────────────────────────────────────────────

function computeWarmScore(skinLab, lipLab) {
  // Returns [-1 cool, +1 warm]
  // Primary: skin b* axis (positive = yellow/warm, negative = blue/cool)
  // Secondary: hue angle (warm hues cluster around 40-80°)
  // Tertiary: lip b*
  // Adapts for deep skin tones (L*<35)

  const skinB = skinLab.b;
  const skinA = skinLab.a;
  const hueAngle = Math.atan2(skinB, skinA) * (180 / Math.PI);

  let warmth;
  if (skinLab.L < 35) {
    // Deep skin: b*/a* ratio more reliable than raw b*
    const ratio = skinA !== 0 ? skinB / Math.abs(skinA) : skinB;
    warmth = clamp(ratio * 0.5, -1, 1);
  } else {
    // Primary: skin b* normalized (typical skin b* range ~5-25)
    warmth = clamp((skinB - 10) / 15, -1, 1);
  }

  // Secondary: hue angle contribution (warm ≈ 50-80°, cool ≈ 0-30° or negative)
  const hueContrib = clamp((hueAngle - 40) / 40, -1, 1) * 0.2;
  warmth = clamp(warmth + hueContrib, -1, 1);

  // Tertiary: lip b*
  if (lipLab) {
    const lipContrib = clamp(lipLab.b / 20, -0.3, 0.3) * 0.15;
    warmth = clamp(warmth + lipContrib, -1, 1);
  }

  return warmth;
}

function computeDepthScore(skinLab, hairLab, eyeLab) {
  // Returns [0 light, 1 deep]
  // Weighted L* average: 45% hair + 35% skin + 20% eyes, inverted
  const hairL = hairLab ? hairLab.L : 50;
  const eyeL = eyeLab ? eyeLab.L : 50;
  const weightedL = hairL * 0.45 + skinLab.L * 0.35 + eyeL * 0.20;
  // Invert: low L* → high depth. L* range roughly 20-90 for people
  return clamp(1 - (weightedL - 20) / 70, 0, 1);
}

function computeChromaScore(skinLab, hairLab, eyeLab, lipLab) {
  // Returns [0 soft, 1 bright]
  // 50% average feature chroma (C*) + 50% L* contrast range between features

  const features = [skinLab, hairLab, eyeLab, lipLab].filter(Boolean);
  const chromas = features.map(chroma);
  const avgChroma = chromas.reduce((a, b) => a + b, 0) / chromas.length;
  // Typical chroma range for face features: ~5 (very muted) to ~45 (vivid)
  const chromaPart = clamp(avgChroma / 40, 0, 1);

  // L* contrast: range between lightest and darkest feature
  const ls = features.map((f) => f.L);
  const lRange = Math.max(...ls) - Math.min(...ls);
  // Typical range: 10 (low contrast) to 60+ (high contrast)
  const contrastPart = clamp(lRange / 60, 0, 1);

  return chromaPart * 0.5 + contrastPart * 0.5;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

// ─── Season profile matching ────────────────────────────────────────

// Each profile is a point in (warmth, depth, chroma) space
const SEASON_PROFILES = {
  "Light Spring":   { warm:  0.55, depth: 0.20, chroma: 0.50 },
  "True Spring":    { warm:  0.70, depth: 0.40, chroma: 0.65 },
  "Bright Spring":  { warm:  0.40, depth: 0.35, chroma: 0.90 },
  "Light Summer":   { warm: -0.35, depth: 0.20, chroma: 0.35 },
  "True Summer":    { warm: -0.55, depth: 0.40, chroma: 0.40 },
  "Soft Summer":    { warm: -0.25, depth: 0.45, chroma: 0.20 },
  "Soft Autumn":    { warm:  0.30, depth: 0.45, chroma: 0.25 },
  "True Autumn":    { warm:  0.65, depth: 0.60, chroma: 0.55 },
  "Deep Autumn":    { warm:  0.45, depth: 0.80, chroma: 0.55 },
  "Deep Winter":    { warm: -0.40, depth: 0.80, chroma: 0.70 },
  "True Winter":    { warm: -0.65, depth: 0.55, chroma: 0.75 },
  "Bright Winter":  { warm: -0.30, depth: 0.40, chroma: 0.90 },
};

function matchSeason(warm, depth, chromaVal) {
  // Weighted Euclidean distance (warmth 2.0×, depth 1.3×, chroma 1.0×)
  const wW = 2.0, wD = 1.3, wC = 1.0;
  const distances = Object.entries(SEASON_PROFILES).map(([name, p]) => {
    const d = Math.sqrt(
      wW * Math.pow(warm - p.warm, 2) +
      wD * Math.pow(depth - p.depth, 2) +
      wC * Math.pow(chromaVal - p.chroma, 2)
    );
    return { name, distance: d };
  });
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
}

function generateReasoning(warm, depth, chromaVal, ranked) {
  const top = ranked[0];
  const runner = ranked[1];

  const warmLabel = warm > 0.2 ? "warm" : warm < -0.2 ? "cool" : "neutral";
  const depthLabel = depth > 0.6 ? "deep" : depth < 0.35 ? "light" : "medium";
  const chromaLabel = chromaVal > 0.6 ? "bright/clear" : chromaVal < 0.35 ? "soft/muted" : "moderate";

  const confidence = 1 - top.distance / (top.distance + runner.distance + 0.001);
  const confLabel = confidence > 0.65 ? "high" : confidence > 0.45 ? "moderate" : "low";

  let reasoning = `Analysis indicates ${warmLabel} undertone (score: ${warm.toFixed(2)}), `;
  reasoning += `${depthLabel} overall depth (score: ${depth.toFixed(2)}), `;
  reasoning += `and ${chromaLabel} chroma (score: ${chromaVal.toFixed(2)}). `;
  reasoning += `This combination maps most closely to ${top.name}`;
  if (confLabel !== "high") {
    reasoning += `, with ${runner.name} as a close alternative`;
  }
  reasoning += `. Confidence: ${confLabel} (${(confidence * 100).toFixed(0)}%).`;

  return reasoning;
}

// ─── Validation ─────────────────────────────────────────────────────

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

function validateExtraction(data) {
  const required = ["skin_forehead", "skin_cheek", "eye_iris", "lip", "eyebrow"];
  const optional = ["skin_neck", "skin_jawline", "hair", "eye_sclera"];
  const errors = [];

  for (const field of required) {
    if (!data[field] || !HEX_RE.test(data[field])) {
      errors.push(`Missing or invalid required field: ${field} (got: ${data[field]})`);
    }
  }
  for (const field of optional) {
    if (data[field] && data[field] !== "N/A" && !HEX_RE.test(data[field])) {
      errors.push(`Invalid optional field: ${field} (got: ${data[field]})`);
    }
  }
  return errors;
}

// ─── Main pipeline ──────────────────────────────────────────────────

function analyzeColors(extractedData) {
  // 1. Convert all to Lab
  const rawLabs = {};
  for (const [key, hex] of Object.entries(extractedData)) {
    if (hex && hex !== "N/A" && HEX_RE.test(hex)) {
      rawLabs[key] = hexToLab(hex);
    }
  }

  // 2. White balance correction using sclera (with fallback)
  let shift;
  let whiteBalanceMethod;
  if (rawLabs.eye_sclera && isScleraReliable(rawLabs.eye_sclera)) {
    shift = computeWhiteBalanceShift(rawLabs.eye_sclera);
    whiteBalanceMethod = "sclera";
  } else {
    const skinSamples = ["skin_forehead", "skin_cheek", "skin_neck", "skin_jawline"]
      .filter((k) => rawLabs[k])
      .map((k) => rawLabs[k]);
    shift = computeFallbackShift(skinSamples.length ? skinSamples : [{ L: 50, a: 10, b: 15 }]);
    whiteBalanceMethod = "fallback";
  }

  const corrected = {};
  for (const [key, lab] of Object.entries(rawLabs)) {
    corrected[key] = correctColor(lab, shift);
  }

  // 3. Average skin samples, resolve effective hair color
  const skinSamples = ["skin_forehead", "skin_cheek", "skin_neck", "skin_jawline"]
    .filter((k) => corrected[k])
    .map((k) => corrected[k]);
  const skinLab = averageLab(skinSamples);
  const hairLab = getEffectiveHairLab(corrected.hair || null, corrected.eyebrow || null);
  const eyeLab = corrected.eye_iris || null;
  const lipLab = corrected.lip || null;

  // 4. Compute 3 axis scores
  const warm = computeWarmScore(skinLab, lipLab);
  const depth = computeDepthScore(skinLab, hairLab, eyeLab);
  const chromaVal = computeChromaScore(skinLab, hairLab, eyeLab, lipLab);

  // 5. Match to season profiles
  const ranked = matchSeason(warm, depth, chromaVal);
  const typology = ranked[0].name;
  const reasoning = generateReasoning(warm, depth, chromaVal, ranked);

  return {
    typology,
    reasoning,
    _debug: {
      whiteBalanceMethod,
      shift,
      raw: Object.fromEntries(
        Object.entries(rawLabs).map(([k, v]) => [k, { L: +v.L.toFixed(1), a: +v.a.toFixed(1), b: +v.b.toFixed(1) }])
      ),
      corrected: {
        skin: { L: +skinLab.L.toFixed(1), a: +skinLab.a.toFixed(1), b: +skinLab.b.toFixed(1) },
        hair: hairLab ? { L: +hairLab.L.toFixed(1), a: +hairLab.a.toFixed(1), b: +hairLab.b.toFixed(1) } : null,
        eye: eyeLab ? { L: +eyeLab.L.toFixed(1), a: +eyeLab.a.toFixed(1), b: +eyeLab.b.toFixed(1) } : null,
        lip: lipLab ? { L: +lipLab.L.toFixed(1), a: +lipLab.a.toFixed(1), b: +lipLab.b.toFixed(1) } : null,
      },
      scores: { warm: +warm.toFixed(3), depth: +depth.toFixed(3), chroma: +chromaVal.toFixed(3) },
      ranked: ranked.slice(0, 3).map((r) => ({ name: r.name, distance: +r.distance.toFixed(3) })),
    },
  };
}

module.exports = {
  hexToRgb, rgbToXyz, xyzToLab, hexToLab,
  isScleraReliable, computeWhiteBalanceShift, computeFallbackShift, correctColor,
  averageLab, getEffectiveHairLab,
  computeWarmScore, computeDepthScore, computeChromaScore,
  matchSeason, generateReasoning,
  validateExtraction, analyzeColors,
  SEASON_PROFILES,
};
