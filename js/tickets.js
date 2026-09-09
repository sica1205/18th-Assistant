// ===== Skin Tickets =====
        const TICKETS = [
            {
                id: 'rare',
                title: 'Rare Ticket',
                icon: 'img/tickets/rare-tick.png',
                color: '#3061FF',
                description: '5% job boost'
            },
            {
                id: 'epic',
                title: 'Epic Ticket',
                icon: 'img/tickets/epic-tick.png',
                color: '#B030FF',
                description: '7% job boost, +1 \'Respect Point\' la \'Payday\''
            },
            {
                id: 'legendary',
                title: 'Legendary Ticket',
                icon: 'img/tickets/legendary-tick.png',
                color: '#FBDE41',
                description: '10% job boost, +1 \'Respect Point\' și $500 în plus la \'Payday\''
            },
            {
                id: '7th-anniversary',
                title: '7th Anniversary Ticket',
                icon: 'img/tickets/7-aniversar-tick.png',
                color: '#EEDF15',
                description: '45% job boost, timp necesar la \'Payday\' pentru [/getgift] înjumătățit (900s, in loc de 1800s) și +1 \'Premium Point\' la \'Payday\''
            },
            {
                id: 'autumn',
                title: 'Autumn Ticket',
                icon: 'img/tickets/autumn-tick.png',
                color: '#FF8B20',
                description: '30% job boost, +2 \'Respect Points\' la \'Payday\' și 1 Free Spin / zi (la 2700+ secunde), altfel doar +2 \'Respect Points\' la \'Payday\''
            },
            {
                id: 'autumn-v2',
                title: 'Autumn V2 Ticket',
                icon: 'img/tickets/autumn-2-tick.png',
                color: '#F36500',
                description: '+25% XP la Farmer, +50% capacitate de transport apă și +30% capacitate de transport pesticide'
            },
            {
                id: 'cupidon',
                title: 'Cupidon Ticket',
                icon: 'img/tickets/cupidon-tick.png',
                color: '#E4567A',
                description: '15% șansă de a primi 2x minereuri / pești la joburile \'Miner\' și \'Industrial Fisherman\''
            },
            {
                id: 'cupidon-v2',
                title: 'Cupidon V2 Ticket',
                icon: 'img/tickets/cupidon-2-tick.png',
                color: '#E31467',
                description: '40% Job boost și 1 \'B-Point\' pentru fiecare $1.250 din bacșiș la \'Curier & Pizza\' sau 1 \'B-Point\' pentru fiecare $2.500 de la pasagerii de la \'Bus Driver\' sau 5 \'B-Points\' pentru fiecare gunoi colectat'
            },
            {
                id: 'cupidon-v3',
                title: 'Cupidon V3 Ticket',
                icon: 'img/tickets/cupidon-3-tick.png',
                color: '#D53154',
                description: 'Vei primi cu 7% mai multi bani la toate rob-urile efectuate cu succes. Acesta ofera un punct de rob atunci cand efectuezi rob Yacht, doua puncte la rob \'ATM\', 3 puncte la rob \'Museum\' si 5 la efectuarea rob-ului \'Rob Heist\''
            },
            {
                id: 'easter',
                title: 'Easter Ticket',
                icon: 'img/tickets/easter-tick.png',
                color: '#BA65B6',
                description: '10% șansă de a primi 2x minereuri / pești sau 3% șansă de a primi 3x minereuri / pești la job-urile \'Miner\' și \'Industrial Fisherman\''
            },
            {
                id: 'easter-v3',
                title: 'Easter V3 Ticket',
                icon: 'img/tickets/easter-v3-skin-tic.png',
                color: '#8BBD4C',
                description: '20% șansă de 2x \'Premium Points\' obținute de la \'Alien\' (Hunter), 33% șansă să primești dublu iteme sau 5% șansă să primești triplu iteme cand lootezi un animal la jobul \'Hunter\''
            },
            {
                id: 'halloween',
                title: 'Halloween Ticket',
                icon: 'img/tickets/hallow-tick.png',
                color: '#A5462E',
                description: '35% Job boost și 1 \'B-Point\' pentru fiecare $25.000 munciți (mai puțin la Miner, Hunter, și Industrial Fisherman)'
            },
            {
                id: 'spring',
                title: 'Spring Ticket',
                icon: 'img/tickets/spring-tick.png',
                color: '#8B943B',
                description: '15% job boost, +69 \'B-Points\' și +3 \'Respect Points\' la \'Payday\' (la 2696+ secunde), altfel +15 \'B-Points\' și +1 \'Respect Point\''
            },
            {
                id: 'spring-v2',
                title: 'Spring V2 Ticket',
                icon: 'img/tickets/spring-2-tick.png',
                color: '#88DB14',
                description: '+1 \'Rob Point\' in plus la Payday, respectiv 1 \'Free Point\' ca politist și cu 50% mai multe materiale la \'Arms Dealer\''
            },
            {
                id: 'summer-fest',
                title: 'Summer Fest Ticket',
                icon: 'img/tickets/summer-fest-tick.png',
                color: '#FFB652',
                description: '+6 \'Premium Points\', +200 \'B-Points\' și +4 \'Respect Points\' la \'Payday\' (la 1801+ secunde), altfel +2 \'Premium Points\', +50 \'B-Points\' și +2 \'Respect Points\''
            },
            {
                id: 'summer',
                title: 'Summer Ticket',
                icon: 'img/tickets/summer-tick.png',
                color: '#60BCDA',
                description: '+3 \'Respect Points\', +1 \'Premium Point\' și $5.000 în plus la \'Payday\' (sub 1800 secunde) sau +2 \'Premium Points\' (la 1801+ secunde) la \'Payday\''
            },
            {
                id: 'winter',
                title: 'Winter Ticket',
                icon: 'img/tickets/winter-tick.png',
                color: '#5FB6E0',
                description: '15% job boost, +50 B-Points și $1,000 în plus la \'Payday\' (la 1801+ secunde), altfel +25 \'B-Points\' și $500 în plus'
            },
            {
                id: 'winter-v2',
                title: 'Winter V2 Ticket',
                icon: 'img/tickets/winter-v2-tick.png',
                color: '#295AC3',
                description: '15% sanșă de 2x \'Premium Points\' obținute de la \'Alien\' (Hunter) și 33% șansă de a primi 2x minereuri / pești sau 5% șansă de a primi 3x minereuri / pești la job-urile \'Miner\' și \'Industrial Fisherman\''
            },
            {
                id: 'winter-v3',
                title: 'Winter V3 Ticket',
                icon: 'img/tickets/winter3-tick.png',
                color: '#8066AA',
                description: '+25% Boost la Blood & Gold, Daily Quests, Stunts, Drift Zones, Repo Work'
            },
            {
                id: 'worker',
                title: 'Worker Ticket',
                icon: 'img/tickets/worker-tick.png',
                color: '#F7B500',
                description: '20% job boost, 25% șansă de a primi dublu materiale și 10% șansă de a primi triplu materiale la job-ul \'Arms Dealer\''
            },
            {
                id: 'xmas',
                title: 'xMas Ticket',
                icon: 'img/tickets/xmas-tick.png',
                color: '#FF0000',
                description: '3 puncte premium, 2 puncte de respect, 100 \'B-Points\' (la 1801+ secunde), altfel 1 punct premium, 1 punct de respect, 25 \'B-Points\' (sub 1801 secunde)'
            }
        ];

        const ticketsGrid = document.getElementById('ticketsGrid');
        const ticketDetailTitle = document.getElementById('ticketDetailTitle');
        const ticketDetail = document.getElementById('ticketDetail');

        // Generate ticket cards
        TICKETS.forEach(function (ticket, index) {
            const item = document.createElement('div');
            item.className = 'ticket-card stagger-in';
            item.style.animationDelay = (index * 0.04) + 's';
            item.innerHTML = `
                <img class="ticket-icon" src="${ticket.icon}" alt="${ticket.title}">
                <span class="ticket-name" style="color: ${ticket.color}">${ticket.title}</span>
                <span class="ticket-arrow">→</span>
            `;
            item.addEventListener('click', function () {
                openTicketDetail(ticket);
            });
            ticketsGrid.appendChild(item);
        });

        function openTicketDetail(ticket) {
            ticketDetailTitle.textContent = ticket.title;
            let html = `
                <div class="ticket-hero">
                    <img src="${ticket.icon}" alt="${ticket.title}">
                    <h3 style="color: ${ticket.color}">${ticket.title}</h3>
                </div>
                <div class="ticket-info">
                    <p>${ticket.description}</p>
                </div>
            `;
            ticketDetail.innerHTML = html;
            showTicketDetail();
        }