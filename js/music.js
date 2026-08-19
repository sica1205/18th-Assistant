// ===== Background music =====
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIconOn = document.getElementById('musicIconOn');
const musicIconOff = document.getElementById('musicIconOff');
let musicPlaying = false;

// Volume control - adjust this value between 0.0 (silent) and 1.0 (full blast)
const MUSIC_VOLUME = 0.02;

bgMusic.volume = MUSIC_VOLUME;

function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicIconOn.classList.add('hidden');
        musicIconOff.classList.remove('hidden');
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        musicIconOn.classList.remove('hidden');
        musicIconOff.classList.add('hidden');
    }
    musicPlaying = !musicPlaying;
}

// Auto-play music on page load
window.addEventListener('load', function () {
    bgMusic.play().then(function () {
        musicPlaying = true;
        musicBtn.classList.add('playing');
        musicIconOn.classList.remove('hidden');
        musicIconOff.classList.add('hidden');
    }).catch(function () {
        // Autoplay blocked by browser - user must click the button
        musicPlaying = false;
        musicBtn.classList.remove('playing');
        musicIconOn.classList.add('hidden');
        musicIconOff.classList.remove('hidden');
    });
});