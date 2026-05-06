(function initAccessibilityTools() {
  if (document.querySelector(".accessibility-toolbar")) return;

  const config = {
    enableFontSizeControls: true,

    // Change the floating button position.
    // Accepted values: "left", "right".
    position: "right",

    minFontScale: 90,
    maxFontScale: 125,
    step: 5,
  };

  const defaultState = {
    dyslexia: false,
    contrast: false,
    fontScale: 100,
  };

  const storageKey = "wails-2026-accessibility";
  const rootElement = document.documentElement;

  function readState() {
    try {
      const storedState = window.localStorage.getItem(storageKey);
      if (!storedState) return { ...defaultState };

      return {
        ...defaultState,
        ...JSON.parse(storedState),
      };
    } catch (error) {
      return { ...defaultState };
    }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      // localStorage may be unavailable in some private browsing modes.
    }
  }

  function clampFontScale(value) {
    return Math.min(config.maxFontScale, Math.max(config.minFontScale, value));
  }

  let state = readState();

  if (!config.enableFontSizeControls) {
    // If the controls are disabled, also neutralize any older saved zoom value.
    state.fontScale = defaultState.fontScale;
  }

  const fontSizeControlsMarkup = config.enableFontSizeControls
    ? `
        <div class="accessibility-actions accessibility-font-size" role="group" aria-label="Text size options">
          <button type="button" data-accessibility-action="decrease-font" aria-label="Decrease text size">A−</button>
          <button type="button" data-accessibility-action="reset-font">Reset</button>
          <button type="button" data-accessibility-action="increase-font" aria-label="Increase text size">A+</button>
        </div>`
    : "";

  const toolbar = `
    <div class="accessibility-toolbar" aria-label="Site accessibility tools">
      <button class="accessibility-toggle" type="button" aria-label="Open site accessibility options" aria-expanded="false" aria-controls="accessibility-panel">
        <span aria-hidden="true">Aa</span>
      </button>

      <div class="accessibility-panel" id="accessibility-panel" hidden>
        <p class="accessibility-panel-title">Display options</p>

        <div class="accessibility-actions" role="group" aria-label="Reading and contrast options">
          <button type="button" data-accessibility-action="dyslexia" aria-pressed="false">
            Dyslexia font
          </button>
          <button type="button" data-accessibility-action="contrast" aria-pressed="false">
            High contrast
          </button>
        </div>
        ${fontSizeControlsMarkup}
      </div>
    </div>`;

  document.body.insertAdjacentHTML("afterbegin", toolbar);

  const toolbarElement = document.querySelector(".accessibility-toolbar");
  if (toolbarElement) {
    toolbarElement.dataset.position = config.position === "right" ? "right" : "left";
  }

  const panel = document.querySelector("#accessibility-panel");
  const panelToggle = document.querySelector(".accessibility-toggle");
  const dyslexiaButton = document.querySelector('[data-accessibility-action="dyslexia"]');
  const contrastButton = document.querySelector('[data-accessibility-action="contrast"]');
  const decreaseFontButton = document.querySelector('[data-accessibility-action="decrease-font"]');
  const resetFontButton = document.querySelector('[data-accessibility-action="reset-font"]');
  const increaseFontButton = document.querySelector('[data-accessibility-action="increase-font"]');

  function setPressed(button, value) {
    if (button) button.setAttribute("aria-pressed", String(value));
  }

  function updateFontSizeButtons() {
    if (!config.enableFontSizeControls) return;

    if (decreaseFontButton) {
      decreaseFontButton.disabled = state.fontScale <= config.minFontScale;
    }

    if (resetFontButton) {
      resetFontButton.disabled = state.fontScale === defaultState.fontScale;
    }

    if (increaseFontButton) {
      increaseFontButton.disabled = state.fontScale >= config.maxFontScale;
    }
  }

  function applyState({ shouldSave = true } = {}) {
    state.fontScale = config.enableFontSizeControls
      ? clampFontScale(state.fontScale)
      : defaultState.fontScale;

    rootElement.classList.toggle("access-dyslexia", state.dyslexia);
    rootElement.classList.toggle("access-contrast", state.contrast);
    rootElement.style.setProperty("--access-font-scale", `${state.fontScale}%`);

    setPressed(dyslexiaButton, state.dyslexia);
    setPressed(contrastButton, state.contrast);
    updateFontSizeButtons();

    if (shouldSave) saveState(state);
  }

  function closePanel() {
    if (!panel || !panelToggle) return;
    panel.hidden = true;
    panelToggle.setAttribute("aria-expanded", "false");
  }

  function togglePanel() {
    if (!panel || !panelToggle) return;
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    panelToggle.setAttribute("aria-expanded", String(!isOpen));
  }

  if (panelToggle) {
    panelToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePanel();
    });
  }

  if (panel) {
    panel.addEventListener("click", (event) => event.stopPropagation());
  }

  if (dyslexiaButton) {
    dyslexiaButton.addEventListener("click", () => {
      state.dyslexia = !state.dyslexia;
      applyState();
    });
  }

  if (contrastButton) {
    contrastButton.addEventListener("click", () => {
      state.contrast = !state.contrast;
      applyState();
    });
  }

  if (config.enableFontSizeControls && decreaseFontButton) {
    decreaseFontButton.addEventListener("click", () => {
      state.fontScale = clampFontScale(state.fontScale - config.step);
      applyState();
    });
  }

  if (config.enableFontSizeControls && resetFontButton) {
    resetFontButton.addEventListener("click", () => {
      state.fontScale = defaultState.fontScale;
      applyState();
    });
  }

  if (config.enableFontSizeControls && increaseFontButton) {
    increaseFontButton.addEventListener("click", () => {
      state.fontScale = clampFontScale(state.fontScale + config.step);
      applyState();
    });
  }

  document.addEventListener("click", closePanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });

  applyState({ shouldSave: false });
})();
