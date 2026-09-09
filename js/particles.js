        // ===== Floating particles =====
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;

        function createParticles() {
            if (!particlesContainer) return;

            // Don't create duplicates
            if (particlesContainer.children.length > 0) return;

            // Performance Mode ON = don't create anything
            if (localStorage.getItem('18th-perf') === 'on') return;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                const size = Math.random() * 7 + 4;

                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
                particle.style.animationDelay = (Math.random() * 10) + 's';

                particlesContainer.appendChild(particle);
            }
        }

        function destroyParticles() {
            if (!particlesContainer) return;

            particlesContainer.replaceChildren();
        }

        // Only create them if Performance Mode is OFF
        if (localStorage.getItem('18th-perf') !== 'on') {
            createParticles();
        }