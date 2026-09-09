// ===== Background music =====

const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIconOn = document.getElementById('musicIconOn');
const musicIconOff = document.getElementById('musicIconOff');

const MUSIC_VOLUME = 0.04;
const MUSIC_MUTED_KEY = '18th-music-muted';

bgMusic.volume = MUSIC_VOLUME;


// ===== Saved preference =====

function isMusicMutedByUser() {
    return localStorage.getItem(MUSIC_MUTED_KEY) === 'true';
}

function setMusicMutedPreference(isMuted) {
    localStorage.setItem(MUSIC_MUTED_KEY, String(isMuted));
}


// ===== UI =====

function updateMusicUI() {
    const isPlaying = !bgMusic.paused;

    musicBtn.classList.toggle('playing', isPlaying);
    musicIconOn.classList.toggle('hidden', !isPlaying);
    musicIconOff.classList.toggle('hidden', isPlaying);
}


// ===== Play =====

async function playMusic() {

    // Dacă utilizatorul a ales mute într-o sesiune anterioară,
    // nu pornim muzica automat.
    if (isMusicMutedByUser()) {
        updateMusicUI();
        return false;
    }

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

        // Utilizatorul a ales explicit să pornească muzica.
        setMusicMutedPreference(false);

        try {
            await bgMusic.play();
            updateMusicUI();
            removeInteractionListeners();
        } catch (error) {
            updateMusicUI();
        }

    } else {

        // Utilizatorul a ales explicit să oprească muzica.
        bgMusic.pause();
        setMusicMutedPreference(true);
        updateMusicUI();

        // Nu mai vrem ca o interacțiune ulterioară
        // să repornească muzica.
        removeInteractionListeners();
    }
}


// ===== Autoplay =====

// Încercăm autoplay doar dacă utilizatorul
// nu a ales anterior să țină muzica oprită.
if (!isMusicMutedByUser()) {

    playMusic().then(function (started) {
        if (started) {
            removeInteractionListeners();
        }
    });

}


// ===== Fallback la prima interacțiune =====

async function startMusicOnInteraction(event) {

    // Dacă utilizatorul a ales mute,
    // nu pornim muzica indiferent de interacțiune.
    if (isMusicMutedByUser()) {
        removeInteractionListeners();
        return;
    }

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


// ===== Interaction listeners =====

// Le adăugăm doar dacă muzica nu a fost dezactivată manual.
if (!isMusicMutedByUser()) {

    // pointerdown acoperă mouse + touch + stylus
    document.addEventListener('pointerdown', startMusicOnInteraction);

    // fallback pentru tastatură
    document.addEventListener('keydown', startMusicOnInteraction);

}


// ===== Keep UI synced =====

bgMusic.addEventListener('play', updateMusicUI);
bgMusic.addEventListener('pause', updateMusicUI);

updateMusicUI();