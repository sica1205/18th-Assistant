(function () {
    const TRACK_BASE = 'audio/';
    const TRACKS = {
        sica12: { file: 'soundtrack1.ogg' },
        seranno: { file: 'soundtrack2.ogg' },
        popricasu: { file: 'soundtrack3.ogg' }
    };

    const TRACK_STORAGE = '18th-track'; // the egg whose song is active

    const bgAudio = document.getElementById('bgMusic');

    // Soft click sound played whenever an avatar is clicked.
    const CLICK_SRC = 'audio/pop.ogg';
    const clickAudio = new Audio(CLICK_SRC);
    clickAudio.volume = 0.5;
    clickAudio.preload = 'auto';

    function playClickSound() {
        // Restart from the beginning so rapid clicks each produce a "pop".
        clickAudio.currentTime = 0;
        clickAudio.play().catch(function () {
            // Ignore failures (e.g. autoplay blocked before first interaction).
        });
    }

    // Restore the saved track NOW (before music.js runs its autoplay) and
    // re-apply the matching particle colors. Default is soundtrack1.
    const savedTrack = localStorage.getItem(TRACK_STORAGE);
    let activeEgg = (savedTrack && TRACKS[savedTrack]) ? savedTrack : 'sica12';
    if (activeEgg) {
        bgAudio.src = TRACK_BASE + TRACKS[activeEgg].file;
    }
    applyEggVisuals(activeEgg);

    let currentAvatar = ''; // the avatar currently being counted
    let clickCount = 0;

    document.querySelectorAll('.team-member').forEach(function (member) {
        member.addEventListener('click', function () {
            const egg = member.getAttribute('data-egg') || '';

            // Play the click sound on every avatar click.
            playClickSound();

            // Clicking a different avatar (or one with no egg) resets the streak.
            if (currentAvatar !== egg) {
                currentAvatar = egg;
                clickCount = 1;
            } else {
                clickCount++;
            }

            // 5 clicks on the same avatar -> try to trigger its song.
            if (egg && clickCount >= 5) {
                clickCount = 0;
                activateEgg(egg);
            }
        });
    });

    function activateEgg(egg) {
        currentAvatar = '';
        clickCount = 0;

        // If this egg's song is already the one playing, ignore the clicks
        // (never restart the same song from the beginning).
        if (egg === activeEgg) {
            return;
        }

        // Switch the background track and play it.
        activeEgg = egg;
        bgAudio.src = TRACK_BASE + TRACKS[egg].file;
        bgAudio.play().catch(function () {
            // If the browser blocks it, it starts on the next interaction.
        });

        applyEggVisuals(egg);

        localStorage.setItem(TRACK_STORAGE, egg);

        // Keep the mute/unmute button icon in sync.
        if (typeof updateMusicUI === 'function') {
            updateMusicUI();
        }
    }

    // Sets the particle color for the active egg on <body>:
    function applyEggVisuals(egg) {
        document.body.classList.toggle('egg-seranno', egg === 'seranno');
        document.body.classList.toggle('egg-popricasu', egg === 'popricasu');
    }
})();

