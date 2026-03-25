(function() {
    var imgs = document.querySelectorAll('.hero-slider img');
    if (!imgs.length) return;
    var current = 0;
    imgs[0].classList.add('active');
    setInterval(function() {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
    }, 4000);
})();