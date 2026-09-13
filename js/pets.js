        // ===== Pets =====
        const PETS = [
            {
                name: 'Parrot',
                icon: 'img/pets/Parrot.png',
                benefits: 'Acest Pet nu oferă beneficii',
                obtain: 'Spring Shop (2026)'
            },
            {
                name: 'Lovely Bunny',
                icon: 'img/pets/Lovely-Bunny.png',
                benefits: '1 Premium Point per PayDay',
                obtain: 'Easter V4 Crate'
            },
            {
                name: 'Kuruni',
                icon: 'img/pets/Kuruni.png',
                benefits: '10% Rob Boost',
                obtain: 'Easter Crate V4'
            },
            {
                name: 'Fluffy Bunny',
                icon: 'img/pets/Fluffy-bunny.png',
                benefits: '1 Free Spin la PayDay (la 3550+ secunde)',
                obtain: 'Spring Shop (2026)'
            },
            {
                name: 'Evil Bunny',
                icon: 'img/pets/Evil-bunny.png',
                benefits: '+1 Rob Point/Free Point la PayDay (dacă nu deții deja limita maximă)',
                obtain: 'Spring Shop (2026)'
            },
            {
                name: 'Easter Bunny',
                icon: 'img/pets/Easter-Bunny.png',
                benefits: '10% Job Boost',
                obtain: 'Easter V4 Crate'
            }
        ];

        const petsGrid = document.getElementById('petsGrid');

        // Generate pet cards
        PETS.forEach(function (pet, index) {
            const item = document.createElement('div');
            item.className = 'pet-card stagger-in';
            item.style.animationDelay = (index * 0.08) + 's';
            item.innerHTML = `
                <div class="pet-header">
                    <img src="${pet.icon}" alt="${pet.name}">
                    <span class="pet-name">${pet.name}</span>
                </div>
                <div class="pet-info">
                    <span class="pet-label">Beneficii:</span>
                    <span class="pet-value">${pet.benefits}</span>
                </div>
                <div class="pet-info">
                    <span class="pet-label">Obtinere:</span>
                    <span class="pet-value">${pet.obtain}</span>
                </div>
            `;
            petsGrid.appendChild(item);
        });