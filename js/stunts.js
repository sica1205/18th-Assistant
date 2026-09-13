// ===== Stunts =====
        const STUNTS = [
            { num: 1, speed: '125 km/h' },
            { num: 2, speed: '120 km/h' },
            { num: 3, speed: '105 km/h' },
            { num: 4, speed: '120 km/h' },
            { num: 5, speed: '115 km/h' },
            { num: 6, speed: '115 - 120 km/h' },
            { num: 7, speed: '130 km/h' },
            { num: 8, speed: '130 km/h' },
            { num: 9, speed: '140 km/h' },
            { num: 10, speed: '80 km/h' },
            { num: 11, speed: '130 km/h' },
            { num: 12, speed: '125 km/h' },
            { num: 13, speed: '130 km/h' },
            { num: 14, speed: '140 km/h' },
            { num: 15, speed: '135 km/h' },
            { num: 16, speed: '130 km/h' },
            { num: 17, speed: '120 km/h' },
            { num: 18, speed: '100 km/h' },
            { num: 19, speed: '140 km/h' },
            { num: 20, speed: '90 km/h' },
            { num: 21, speed: '185 km/h' },
            { num: 22, speed: '135 km/h' },
            { num: 23, speed: '150 km/h' },
            { num: 24, speed: '90 km/h' },
            { num: 25, speed: '165 - 170 km/h' },
            { num: 26, speed: '90 km/h' },
            { num: 27, speed: '140 km/h' },
            { num: 28, speed: '120 km/h' },
            { num: 29, speed: '155 km/h' },
            { num: 30, speed: '120 km/h' },
            { num: 31, speed: '130 km/h' },
            { num: 32, speed: '110 km/h' },
            { num: 33, speed: '110 km/h' },
            { num: 34, speed: '135 km/h' },
            { num: 35, speed: '110 km/h' },
            { num: 36, speed: '110 km/h' },
            { num: 37, speed: '140 km/h' },
            { num: 38, speed: '80 km/h' },
            { num: 39, speed: '110 km/h' },
            { num: 41, speed: '160 km/h' },
            { num: 42, speed: '95 km/h' },
            { num: 43, speed: '120 km/h' },
            { num: 44, speed: '180 km/h' },
            { num: 45, speed: '170 km/h' },
            { num: 46, speed: '135 km/h' },
            { num: 47, speed: '90 - 105 km/h' },
            { num: 48, speed: '125 km/h' },
            { num: 49, speed: '120 km/h' },
            { num: 50, speed: '100 km/h' },
            { num: 51, speed: '95 km/h' },
            { num: 52, speed: '120 km/h' },
            { num: 53, speed: '170 km/h' },
            { num: 54, speed: '110 km/h' },
            { num: 55, speed: '135 km/h' },
            { num: 56, speed: '110 km/h' },
            { num: 57, speed: '110 km/h' }
        ];

        const stuntsContainer = document.getElementById('stuntsContainer');

        // Generate stunt cards
        STUNTS.forEach(function (stunt, index) {
            const item = document.createElement('div');
            item.className = 'stunt-card stagger-in';
            item.style.animationDelay = (index * 0.02) + 's';
            item.innerHTML = `
                <span class="stunt-num">Stunt ${stunt.num}</span>
                <span class="stunt-speed">${stunt.speed}</span>
            `;
            stuntsContainer.appendChild(item);
        });