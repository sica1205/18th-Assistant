// ===== Gallery =====
        const TOTAL_IMAGES = 33;
        const TOTAL_REAL_IMAGES = 33;
        const PLACEHOLDER_IMG = 'img/backgrounds/backgound.webp';

        const galleryGrid = document.getElementById('galleryGrid');

        function getImageSrc(index) {
            if (index <= TOTAL_REAL_IMAGES) {
                return 'img/locatii/poza' + index + '.webp';
            }
            return PLACEHOLDER_IMG;
        }

        // Generate 33 gallery items
        for (let i = 1; i <= TOTAL_IMAGES; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item stagger-in';
            item.style.animationDelay = (i * 0.03) + 's';
            item.innerHTML = `
                <span class="num">${i}</span>
                <img src="${getImageSrc(i)}" alt="Imagine ${i}" loading="lazy">
            `;
            item.addEventListener('click', function () {
                openLightbox(getImageSrc(i), i);
            });
            galleryGrid.appendChild(item);
        }

        // ===== Special Drops =====
        const specialDropsGrid = document.getElementById('specialDropsGrid');

        // Generate Special Drops gallery
        const specialDropImages = [
            {
                src: 'img/misc/summer2.png',
                alt: 'Special Drop'
            }
        ];

        specialDropImages.forEach(function (drop, index) {
            const item = document.createElement('div');
            item.className = 'gallery-item stagger-in';
            item.style.animationDelay = (index * 0.05) + 's';
            item.innerHTML = `
                <span class="num">${index + 1}</span>
                <img src="${drop.src}" alt="${drop.alt}" loading="lazy">
            `;
            item.addEventListener('click', function () {
                openLightbox(drop.src, index + 1);
            });
            specialDropsGrid.appendChild(item);
        });

        // ===== Bring The Summer =====
        const bringTheSummerGrid = document.getElementById('bringTheSummerGrid');

        // Generate Bring The Summer gallery
        const bringTheSummerImages = [
            {
                src: 'img/misc/summer1.png',
                alt: 'Bring The Summer'
            }
        ];

        bringTheSummerImages.forEach(function (drop, index) {
            const item = document.createElement('div');
            item.className = 'gallery-item stagger-in';
            item.style.animationDelay = (index * 0.05) + 's';
            item.innerHTML = `
                <span class="num">${index + 1}</span>
                <img src="${drop.src}" alt="${drop.alt}" loading="lazy">
            `;
            item.addEventListener('click', function () {
                openLightbox(drop.src, index + 1);
            });
            bringTheSummerGrid.appendChild(item);
        });