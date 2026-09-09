// ===== Scroll către secțiunea About =====

        let aboutTransitioning = false;

        function preventAboutScroll(e) {
            const isMobile = window.matchMedia('(max-width: 600px)').matches;

            if (aboutTransitioning) {
                if (e.cancelable) {
                    e.preventDefault();
                }

                e.stopPropagation();
                return;
            }

            if (document.body.classList.contains('about-locked')) {

                // Pe mobil permitem scroll doar ÎN About
                if (isMobile) {
                    const aboutClan = document.getElementById('aboutClan');

                    if (aboutClan.contains(e.target)) {
                        return;
                    }
                }

                if (e.cancelable) {
                    e.preventDefault();
                }

                e.stopPropagation();
            }
        }

        // Blochează rotița + touch încă din faza de capture
        document.addEventListener('wheel', preventAboutScroll, {
            passive: false,
            capture: true
        });

        document.addEventListener('touchmove', preventAboutScroll, {
            passive: false,
            capture: true
        });

        // Blochează și tastele care pot face scroll
        document.addEventListener('keydown', function (event) {
            if (
                aboutTransitioning ||
                document.body.classList.contains('about-locked')
            ) {
                const scrollKeys = [
                    'ArrowUp',
                    'ArrowDown',
                    'PageUp',
                    'PageDown',
                    'Home',
                    'End',
                    ' '
                ];

                if (scrollKeys.includes(event.key)) {
                    event.preventDefault();
                }
            }
        }, true);


        function animateScrollTo(targetY, duration, callback) {
            const startY = window.scrollY;
            const distance = targetY - startY;
            const startTime = performance.now();

            function easeInOutCubic(t) {
                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);

                window.scrollTo(0, startY + distance * eased);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, targetY);

                    if (callback) {
                        callback();
                    }
                }
            }

            requestAnimationFrame(step);
        }

        function scrollToAbout() {
            if (aboutTransitioning) return;

            aboutTransitioning = true;
            document.body.classList.add('about-open');

            requestAnimationFrame(function () {
                const aboutClan = document.getElementById('aboutClan');
                const targetY = window.scrollY + aboutClan.getBoundingClientRect().top;

                animateScrollTo(targetY, 650, function () {
                    document.body.classList.add('about-locked');

                    // Abia acum apare butonul ▲
                    document.body.classList.add('about-ready');

                    aboutTransitioning = false;
                });
            });
        }

        function scrollBackHome() {
            if (aboutTransitioning) return;

            aboutTransitioning = true;

            // Ascunde ▲ imediat când îl apeși
            document.body.classList.remove('about-ready');
            document.body.classList.remove('about-locked');

            animateScrollTo(0, 650, function () {
                document.body.classList.remove('about-open');

                window.scrollTo(0, 0);

                aboutTransitioning = false;
            });
        }
