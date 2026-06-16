const nav = `
<nav>
  <a class="nav-logo" href="index.html">
    <img src="img/logo/logo.svg" alt="WAILS 2026">
  </a>

  <ul class="nav-links">
    <li><a href="index.html#about">About</a></li>
    <li><a href="cfp.html">Call for Papers</a></li>
    <li><a href="index.html#keynotes">Keynotes</a></li>
    <li><a href="committee.html">Committee</a></li>

    <li class="has-dropdown">
      <a href="#">Attend</a>
      <div class="dropdown">
        <div class="dropdown-inner">
          <a href="attend-registration.html">Registration</a>
          <a href="attend-travel.html">Travel Information</a>
          <a href="schedule-paris.html">What's On in Paris</a>
        </div>
      </div>
    </li>

    <li class="has-dropdown">
      <a href="#">Schedule</a>
      <div class="dropdown">
        <div class="dropdown-inner">
          <a href="schedule-programme.html">Programme</a>
          <a href="schedule-accepted-papers.html">Accepted Papers</a>
        </div>
      </div>
    </li>

    <li><a href="cfp.html" class="nav-cta">Submit</a></li>
  </ul>

  <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav-mobile" id="mobile-menu">
    <a href="index.html#about">About</a>
    <a href="cfp.html">Call for Papers</a>
    <a href="index.html#keynotes">Keynotes</a>
    <a href="committee.html">Committee</a>

    <div class="nav-mobile-group">
      <div class="nav-mobile-label">Attend</div>
      <a href="attend-registration.html">Registration</a>
      <a href="attend-travel.html">Travel Information</a>
    </div>

    <div class="nav-mobile-group">
      <div class="nav-mobile-label">Schedule</div>
      <a href="schedule-programme.html">Programme</a>
      <a href="schedule-accepted-papers.html">Accepted Papers</a>
    </div>

    <a href="cfp.html" class="nav-mobile-cta">Submit</a>
  </div>
</nav>`;

document.body.insertAdjacentHTML("afterbegin", nav);

const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".nav-mobile");
const mobileLinks = document.querySelectorAll(".nav-mobile a");
const mobileNavBreakpoint = 1200;

function closeMenu() {
  mobileMenu.classList.remove("is-open");
  toggle.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  mobileMenu.classList.add("is-open");
  toggle.classList.add("is-open");
  toggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    const navEl = document.querySelector("nav");
    if (navEl && !navEl.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileNavBreakpoint) {
      closeMenu();
    }
  });
}

(function loadAccessibilityAssets() {
  const cssPath = "assets/accessibility.css";
  const jsPath = "assets/accessibility.js";

  if (!document.querySelector(`link[href="${cssPath}"]`)) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = cssPath;
    document.head.appendChild(stylesheet);
  }

  if (!document.querySelector(`script[src="${jsPath}"]`)) {
    const script = document.createElement("script");
    script.src = jsPath;
    script.defer = true;
    document.body.appendChild(script);
  }
})();
