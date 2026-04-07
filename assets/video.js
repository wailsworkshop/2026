let muted = true;

function toggleMute() {
    let iframe = document.getElementById('paris-video');
    let btn = document.getElementById('mute-btn');
    muted = !muted;
    let muteParam = muted ? '&mute=1' : '&mute=0';
    iframe.src = iframe.src.replace(/&mute=[01]/, muteParam);
    btn.textContent = muted ? 'Enable audio' : 'Disable audio';
}