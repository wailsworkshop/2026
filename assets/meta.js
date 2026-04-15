(function() {
    const base = "https://wailsworkshop.github.io/2026/";
    const defaultTitle = "WAILS 2026 – Workshop on AI with and for Learning Sciences";
    const defaultDesc = "3rd Workshop on Artificial Intelligence with and for Learning Sciences. Paris, 9–11 December 2026. Theme: Responsible and Inclusive Use of AI in Education.";
    const ogImage = base + "img/og-image.png";
    const currentUrl = base + window.location.pathname.split('/').pop();

    const metas = [
        ["name", "description", defaultDesc],
        ["name", "keywords", "AI, education, learning sciences, workshop, Paris, 2026, responsible AI, serious games, WAILS"],
        ["name", "author", "WAILS Organizing Committee"],
        ["property", "og:type", "website"],
        ["property", "og:url", currentUrl],
        ["property", "og:title", document.title],
        ["property", "og:description", defaultDesc],
        ["property", "og:image", ogImage],
        ["name", "twitter:card", "summary_large_image"],
        ["name", "twitter:title", document.title],
        ["name", "twitter:description", defaultDesc],
        ["name", "twitter:image", ogImage],
    ];

    metas.forEach(function([attr, name, content]) {
        const el = document.createElement("meta");
        el.setAttribute(attr, name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
    });

    const canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", currentUrl);
    document.head.appendChild(canonical);
})();