// ===== Background music =====

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIconOn = document.getElementById('musicIconOn');
const musicIconOff = document.getElementById('musicIconOff');

const MUSIC_VOLUME = 0.04;

bgMusic.volume = MUSIC_VOLUME;


// ===== UI =====

function updateMusicUI() {
    const isPlaying = !bgMusic.paused;

    musicBtn.classList.toggle('playing', isPlaying);
    musicIconOn.classList.toggle('hidden', !isPlaying);
    musicIconOff.classList.toggle('hidden', isPlaying);
}


// ===== Play =====

async function playMusic() {
    try {
        await bgMusic.play();
        updateMusicUI();
        return true;
    } catch (error) {
        updateMusicUI();
        return false;
    }
}


// ===== Mute / Unmute button =====

async function toggleMusic() {
    if (bgMusic.paused) {
        await playMusic();
    } else {
        bgMusic.pause();
        updateMusicUI();
    }
}


// ===== Autoplay =====

// Încercăm o singură dată autoplay direct.
playMusic().then(function (started) {
    if (started) {
        removeInteractionListeners();
    }
});


// ===== Fallback la prima interacțiune =====

async function startMusicOnInteraction(event) {

    // Dacă utilizatorul a apăsat chiar butonul de muzică,
    // lăsăm toggleMusic() să se ocupe de tot.
    if (event.target.closest('#musicBtn')) {
        return;
    }

    const started = await playMusic();

    if (started) {
        removeInteractionListeners();
    }
}


function removeInteractionListeners() {
    document.removeEventListener('pointerdown', startMusicOnInteraction);
    document.removeEventListener('keydown', startMusicOnInteraction);
}


// pointerdown acoperă mouse + touch + stylus
document.addEventListener('pointerdown', startMusicOnInteraction);

// fallback pentru tastatură
document.addEventListener('keydown', startMusicOnInteraction);


// ===== Keep UI synced =====

bgMusic.addEventListener('play', updateMusicUI);
bgMusic.addEventListener('pause', updateMusicUI);

updateMusicUI();