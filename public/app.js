// State
let faceBase64 = null;
let bodyBase64 = null;
let currentTypology = null;
let casualLastImage = null;
let smartLastImage = null;
let allPalettes = null;

// Elements — Step 1: Typology
const stepTypology = document.getElementById("step-typology");
const faceInput = document.getElementById("face-input");
const faceDrop = document.getElementById("face-drop");
const facePreview = document.getElementById("face-preview");
const facePlaceholder = document.getElementById("face-placeholder");
const analyzeBtn = document.getElementById("analyze-btn");
const analyzeStatus = document.getElementById("analyze-status");
const analyzeError = document.getElementById("analyze-error");
const typologyButtons = document.getElementById("typology-buttons");
const typologyResult = document.getElementById("typology-result");
const typologyName = document.getElementById("typology-name");
const typologyReasoning = document.getElementById("typology-reasoning");
const typologyVibe = document.getElementById("typology-vibe");
const colorSwatches = document.getElementById("color-swatches");
const forbiddenColors = document.getElementById("forbidden-colors");
const nextBtn = document.getElementById("next-btn");

// Elements — Step 2: Body upload
const stepBody = document.getElementById("step-body");
const bodyInput = document.getElementById("body-input");
const bodyDrop = document.getElementById("body-drop");
const bodyPreview = document.getElementById("body-preview");
const bodyPlaceholder = document.getElementById("body-placeholder");
const bodyTypologyBadge = document.getElementById("body-typology-badge");
const backBtn = document.getElementById("back-btn");
const generateBtn = document.getElementById("generate-btn");
const generateStatus = document.getElementById("generate-status");
const generateError = document.getElementById("generate-error");

// Elements — Step 3: Results
const stepResults = document.getElementById("step-results");
const resultsTypology = document.getElementById("results-typology");
const casualThread = document.getElementById("casual-thread");
const smartThread = document.getElementById("smart-thread");
const casualForm = document.getElementById("casual-form");
const smartForm = document.getElementById("smart-form");
const casualInput = document.getElementById("casual-input");
const smartInput = document.getElementById("smart-input");
const restartBtn = document.getElementById("restart-btn");

// ── Palettes ──

async function fetchPalettes() {
  if (allPalettes) return allPalettes;
  const res = await fetch("/api/palettes");
  allPalettes = await res.json();
  return allPalettes;
}

// Populate the manual selection buttons in step 1
const typologyEmojis = {
  "Light Spring": "🌸",
  "True Spring": "🌷",
  "Bright Spring": "🌻",
  "Light Summer": "🫧",
  "True Summer": "🌊",
  "Soft Summer": "🌫️",
  "Soft Autumn": "🍂",
  "True Autumn": "🍁",
  "Deep Autumn": "🌰",
  "Deep Winter": "🌑",
  "True Winter": "❄️",
  "Bright Winter": "💎",
};

async function initTypologyButtons() {
  await fetchPalettes();
  for (const name of Object.keys(allPalettes)) {
    const btn = document.createElement("button");
    const emoji = typologyEmojis[name] || "";
    btn.textContent = emoji ? `${emoji} ${name}` : name;
    btn.dataset.typology = name;
    btn.className = "px-3 py-1.5 text-sm rounded-lg border border-stone-300 text-stone-600 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-colors";
    btn.addEventListener("click", () => selectTypologyButton(name));
    typologyButtons.appendChild(btn);
  }
}

function selectTypologyButton(name) {
  // Update active state
  for (const btn of typologyButtons.children) {
    if (btn.dataset.typology === name) {
      btn.className = "px-3 py-1.5 text-sm rounded-lg border-2 border-violet-500 text-violet-700 bg-violet-50 font-medium transition-colors";
    } else {
      btn.className = "px-3 py-1.5 text-sm rounded-lg border border-stone-300 text-stone-600 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-colors";
    }
  }
  showTypologyResult(name, "Manually selected color typology.");
}

function displayPalette(palette) {
  typologyVibe.textContent = palette.vibe;

  colorSwatches.innerHTML = "";
  for (const color of palette.allowedColors) {
    const swatch = document.createElement("span");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = color.hex;
    swatch.title = color.name;
    colorSwatches.appendChild(swatch);
  }

  forbiddenColors.textContent = palette.forbiddenColors.join(", ");
}

function showTypologyResult(name, reasoning) {
  currentTypology = name;
  typologyName.textContent = name;
  typologyReasoning.textContent = reasoning;
  // Sync button highlight
  for (const btn of typologyButtons.children) {
    if (btn.dataset.typology === name) {
      btn.className = "px-3 py-1.5 text-sm rounded-lg border-2 border-violet-500 text-violet-700 bg-violet-50 font-medium transition-colors";
    } else {
      btn.className = "px-3 py-1.5 text-sm rounded-lg border border-stone-300 text-stone-600 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-colors";
    }
  }
  displayPalette(allPalettes[name]);
  typologyResult.classList.remove("hidden");
}

// ── File helpers ──

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setupUpload(input, dropZone, preview, placeholder, onReady) {
  input.addEventListener("change", async (e) => {
    if (e.target.files[0]) {
      const dataUrl = await fileToBase64(e.target.files[0]);
      preview.src = dataUrl;
      preview.classList.remove("hidden");
      placeholder.classList.add("hidden");
      onReady(dataUrl);
    }
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });
  dropZone.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const dataUrl = await fileToBase64(file);
      preview.src = dataUrl;
      preview.classList.remove("hidden");
      placeholder.classList.add("hidden");
      onReady(dataUrl);
    }
  });
}

// ── Step navigation ──

function showStep(step) {
  stepTypology.classList.add("hidden");
  stepBody.classList.add("hidden");
  stepResults.classList.add("hidden");
  step.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Step 1: Face upload + analyze ──

setupUpload(faceInput, faceDrop, facePreview, facePlaceholder, (dataUrl) => {
  faceBase64 = dataUrl;
  analyzeBtn.disabled = false;
});

analyzeBtn.addEventListener("click", async () => {
  analyzeError.classList.add("hidden");
  analyzeStatus.classList.remove("hidden");
  analyzeBtn.disabled = true;

  try {
    const base64Data = faceBase64.replace(/^data:image\/\w+;base64,/, "");

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ face: base64Data }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Analysis failed");

    await fetchPalettes();
    showTypologyResult(data.typology, data.reasoning);
  } catch (err) {
    analyzeError.textContent = err.message;
    analyzeError.classList.remove("hidden");
  } finally {
    analyzeStatus.classList.add("hidden");
    analyzeBtn.disabled = false;
  }
});

// Step 1 → Step 2
nextBtn.addEventListener("click", () => {
  bodyTypologyBadge.textContent = currentTypology;
  showStep(stepBody);
});

// ── Step 2: Body upload + generate ──

setupUpload(bodyInput, bodyDrop, bodyPreview, bodyPlaceholder, (dataUrl) => {
  bodyBase64 = dataUrl;
  generateBtn.disabled = false;
});

backBtn.addEventListener("click", () => showStep(stepTypology));

generateBtn.addEventListener("click", async () => {
  generateError.classList.add("hidden");
  generateStatus.classList.remove("hidden");
  generateBtn.disabled = true;

  casualThread.innerHTML = "";
  smartThread.innerHTML = "";

  try {
    const [casualRes, smartRes] = await Promise.all([
      fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bodyPhoto: bodyBase64, typology: currentTypology, style: "casual" }),
      }),
      fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bodyPhoto: bodyBase64, typology: currentTypology, style: "smart" }),
      }),
    ]);

    const casualData = await casualRes.json();
    const smartData = await smartRes.json();

    if (!casualRes.ok) throw new Error(casualData.error || "Casual generation failed");
    if (!smartRes.ok) throw new Error(smartData.error || "Smart casual generation failed");

    casualLastImage = casualData.image;
    smartLastImage = smartData.image;

    appendImage(casualThread, casualData.image);
    appendImage(smartThread, smartData.image);

    resultsTypology.textContent = currentTypology;
    showStep(stepResults);
  } catch (err) {
    generateError.textContent = err.message;
    generateError.classList.remove("hidden");
  } finally {
    generateStatus.classList.add("hidden");
    generateBtn.disabled = false;
  }
});

// ── Step 3: Results + refinement ──

function appendImage(thread, base64Image) {
  const img = document.createElement("img");
  img.src = `data:image/png;base64,${base64Image}`;
  img.className = "chat-image";
  thread.appendChild(img);
  thread.scrollTop = thread.scrollHeight;
}

function appendUserMessage(thread, text) {
  const bubble = document.createElement("div");
  bubble.className = "bg-violet-50 border border-violet-200 rounded-lg px-3 py-2 text-sm text-violet-800";
  bubble.textContent = text;
  thread.appendChild(bubble);
  thread.scrollTop = thread.scrollHeight;
}

function appendLoading(thread) {
  const loader = document.createElement("div");
  loader.className = "refine-loader flex items-center gap-2 text-sm text-stone-400";
  loader.innerHTML = '<span class="spinner"></span>Generating...';
  thread.appendChild(loader);
  thread.scrollTop = thread.scrollHeight;
  return loader;
}

async function handleRefine(thread, input, sendBtn, getLastImage, setLastImage) {
  const text = input.value.trim();
  if (!text) return;

  appendUserMessage(thread, text);
  input.value = "";
  sendBtn.disabled = true;
  const loader = appendLoading(thread);

  try {
    const res = await fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        previousImage: getLastImage(),
        typology: currentTypology,
        refinement: text,
      }),
    });

    const data = await res.json();
    loader.remove();

    if (!res.ok) throw new Error(data.error || "Refinement failed");

    setLastImage(data.image);
    appendImage(thread, data.image);
  } catch (err) {
    loader.remove();
    const errDiv = document.createElement("div");
    errDiv.className = "text-sm text-red-500";
    errDiv.textContent = err.message;
    thread.appendChild(errDiv);
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

casualForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleRefine(
    casualThread,
    casualInput,
    document.getElementById("casual-send"),
    () => casualLastImage,
    (img) => { casualLastImage = img; }
  );
});

smartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleRefine(
    smartThread,
    smartInput,
    document.getElementById("smart-send"),
    () => smartLastImage,
    (img) => { smartLastImage = img; }
  );
});

// ── Restart ──

restartBtn.addEventListener("click", () => {
  faceBase64 = null;
  bodyBase64 = null;
  currentTypology = null;
  casualLastImage = null;
  smartLastImage = null;

  facePreview.classList.add("hidden");
  facePlaceholder.classList.remove("hidden");
  faceInput.value = "";
  analyzeBtn.disabled = true;

  bodyPreview.classList.add("hidden");
  bodyPlaceholder.classList.remove("hidden");
  bodyInput.value = "";
  generateBtn.disabled = true;

  // Reset typology buttons
  for (const btn of typologyButtons.children) {
    btn.className = "px-3 py-1.5 text-sm rounded-lg border border-stone-300 text-stone-600 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 transition-colors";
  }
  typologyResult.classList.add("hidden");

  showStep(stepTypology);
});

// ── Init ──

initTypologyButtons();
