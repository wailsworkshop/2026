
    (function() {
    var t = new Date(2026, 11, 9, 9, 0, 0);
    function tick() {
    var diff = t - new Date();
    if (diff < 0) diff = 0;
    var el = document.getElementById.bind(document);
    if (el("cd-d")) el("cd-d").textContent = String(Math.floor(diff/86400000)).padStart(3,"0");
    if (el("cd-h")) el("cd-h").textContent = String(Math.floor(diff%86400000/3600000)).padStart(2,"0");
    if (el("cd-m")) el("cd-m").textContent = String(Math.floor(diff%3600000/60000)).padStart(2,"0");
    if (el("cd-s")) el("cd-s").textContent = String(Math.floor(diff%60000/1000)).padStart(2,"0");
}
    tick();
    setInterval(tick, 1000);
})();