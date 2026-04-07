document.addEventListener("DOMContentLoaded", function () {
    const footer = `
    <footer>
      <div>
        <div class="f-logo">WAILS<span>.</span>2026</div>
        <div style="margin-top:0.4rem">3rd Workshop on AI with and for Learning Sciences &middot; Paris, 9&ndash;11 December 2026</div>
      </div>
      <div class="f-links">
        <a href="https://wailsworkshop.github.io/2025/" target="_blank">WAILS 2025 &nearr;</a>
        <a href="mailto:wailsworkshop2026@gmail.com">Contact</a>
      </div>
    </footer>`;

    document.body.insertAdjacentHTML("beforeend", footer);
});