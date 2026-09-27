// ===== Coffers =====
        const COFFERS = [
            {
                id: 'hunter-v1',
                title: "Hunter's Coffer",
                img: 'img/coffers/huntcofferv1.png',
                rewards: [
                    'Panther Fur (x100)',
                    'Bear Fur (x100)',
                    'Bear Fur (x300)',
                    'Bear Fur (x500)',
                    'Moonlight Crate (x3)',
                    'SMG MK 2 (x1)',
                    'Voucher Transcendent (x1)',
                    'Voucher Divine (x1)',
                    'Military Rifle (x1)',
                    'Discount Obey RSQ Type 8 Mansory 10%',
                    'Discount Pfister Carrera Type 911 Convertible 10%',
                    'Discount Karin Spectra Mark 5 10%',
                    'Discount Übermacht M Type 4 Race 10%',
                    'Discount Benefactor AMG1 10%',
                    'Discount Grotti Portofino 20%',
                    'Discount Grotti 40F 10%'
                ]
            },
            {
                id: 'hunter-v2',
                title: "Hunter's Coffer V2",
                img: 'img/coffers/huntcofferv2.png',
                rewards: [
                    'Panther Fur (x100)',
                    'Bear Fur (x100)',
                    'Bear Fur (x300)',
                    'Bear Fur (x500)',
                    'Moonlight Crate (x3)',
                    'SMG MK2 (x1)',
                    'Transcendent Voucher (x1)',
                    'Divine Voucher (x1)',
                    'Military Rifle (x1)',
                    'Ticket Discount Übermacht Type E21 10%',
                    'Ticket Discount Übermacht M Type 4 Race 10%',
                    'Ticket Discount Annis Patrol18 10%',
                    'Ticket Discount Pfister Carrera Type 911 Convertible 10%',
                    'Ticket Discount Benefactor AMG1 10%',
                    'Ticket Discount Enus Cognoscenti 10%',
                    'Ticket Discount Ocelot Vijea 10%'
                ]
            },
            {
                id: 'fish-v1',
                title: "Fisherman's Coffer",
                img: 'img/coffers/fishcofferv1.png',
                rewards: [
                    'Licență Fishbot (10, 15 sau 25 de ore)',
                    'Pure Pearl (x10)',
                    'Spring Pearl (x10)',
                    'Coral Pearl (x10)',
                    'Azure Pearl (x10)',
                    'Dawn Pearl (x10)',
                    'Shell (x100)',
                    'Transcendent Voucher (x1)',
                    'Divine Voucher (x1)',
                    'Ticket Discount Benefactor E Type 63B 50%',
                    'Ticket Discount Annis Vista Spec 34 10%',
                    'Ticket Discount Karin Spectra Spec 4 10%',
                    'Ticket Discount Pegassi Urax 10%',
                    'Ticket Discount Truffade Vayder 10%'
                ]
            },
            {
                id: 'fish-v2',
                title: "Fisherman's Coffer V2",
                img: 'img/coffers/fishcofferv2.png',
                rewards: [
                    'Licență Fishbot (10, 15 sau 25 de ore)',
                    'Pure Pearl (x10)',
                    'Spring Pearl (x10)',
                    'Coral Pearl (x10)',
                    'Azure Pearl (x10)',
                    'Dawn Pearl (x10)',
                    'Shell (x100)',
                    'Transcendent Voucher (x1)',
                    'Divine Voucher (x1)',
                    'Ticket Discount Benefactor E Type 63B 50%',
                    'Ticket Discount Karin Spectra Spec 4 10%',
                    'Ticket Discount Übermacht Type e34 10%',
                    'Ticket Discount Benefactor SEL600 10%',
                    'Ticket Discount Grotti F50 10%',
                    'Ticket Discount Pegassi Tempe STO21 10%'
                ]
            }
        ];

        const coffersGrid = document.getElementById('coffersGrid');
        const cofferTitle = document.getElementById('cofferTitle');
        const cofferDetail = document.getElementById('cofferDetail');

        // Generate coffer cards
        COFFERS.forEach(function (coffer, index) {
            const item = document.createElement('div');
            item.className = 'coffer-card stagger-in';
            item.style.animationDelay = (index * 0.1) + 's';
            item.innerHTML = `
                <img src="${coffer.img}" alt="${coffer.title}">
                <span class="coffer-name">${coffer.title}</span>
            `;
            item.addEventListener('click', function () {
                openCofferDetail(coffer);
            });
            coffersGrid.appendChild(item);
        });

        function openCofferDetail(coffer) {
            cofferTitle.textContent = coffer.title;
            let html = `
                <div class="coffer-hero">
                    <img src="${coffer.img}" alt="${coffer.title}">
                    <h3>${coffer.title}</h3>
                    <span class="rewards-badge">Premii Disponibile</span>
                </div>
                <ul class="rewards-list">
            `;
            coffer.rewards.forEach(function (reward) {
                html += `<li>${reward}</li>`;
            });
            html += '</ul>';
            cofferDetail.innerHTML = html;
            showCofferDetail();
        }