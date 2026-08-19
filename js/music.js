// ===== Background music =====
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIconOn = document.getElementById('musicIconOn');
const musicIconOff = document.getElementById('musicIconOff');
let musicPlaying = false;
let autoplayStarted = false;

// Volume control - adjust this value between 0.0 (silent) and 1.0 (full blast)
const MUSIC_VOLUME = 0.02;

bgMusic.volume = MUSIC_VOLUME;

function setMusicPlaying(isPlaying) {
    musicPlaying = isPlaying;
    if (isPlaying) {
        musicBtn.classList.add('playing');
        musicIconOn.classList.remove('hidden');
        musicIconOff.classList.add('hidden');
    } else {
        musicBtn.classList.remove('playing');
        musicIconOn.classList.add('hidden');
        musicIconOff.classList.remove('hidden');
    }
}

function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        setMusicPlaying(false);
    } else {
        bgMusic.play();
        setMusicPlaying(true);
    }
}

// Start music on the first user interaction with the page
// (browsers block autoplay with sound until the user clicks/taps/keypresses)
function tryAutoplay() {
    if (autoplayStarted) return;
    autoplayStarted = true;

    bgMusic.play().then(function () {
        setMusicPlaying(true);
    }).catch(function () {
        // Still blocked - user must press the music button
        setMusicPlaying(false);
    });

    // Remove listeners after the first attempt
    document.removeEventListener('click', tryAutoplay);
    document.removeEventListener('touchstart', tryAutoplay);
    document.removeEventListener('keydown', tryAutoplay);
    document.removeEventListener('scroll', tryAutoplay);
}

// Try to start music on any user gesture
document.addEventListener('click', tryAutoplay);
document.addEventListener('touchstart', tryAutoplay);
document.addEventListener('keydown', tryAutoplay);

// Also try to start on scroll (some browsers allow it after scrolling)
document.addEventListener('scroll', tryAutoplay, { passive: true });
