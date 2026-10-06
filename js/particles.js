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

                // Leaf proportions: wider than tall, so the silhouette reads as a leaf
                const width = Math.random() * 10 + 12; // 12-22px
                const height = width * (Math.random() * 0.2 + 0.55); // 55-75% of width

                particle.style.width = width.toFixed(1) + 'px';
                particle.style.height = height.toFixed(1) + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 10 + 9) + 's';
                particle.style.animationDelay = (Math.random() * 12) + 's';

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