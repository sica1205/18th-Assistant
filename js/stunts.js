// ===== Stunts =====
const STUNTS = [
    { num: 1, speed: '140 km/h', updated: true },
    { num: 2, speed: '120 km/h', updated: false },
    { num: 3, speed: '125 km/h', updated: true },
    { num: 4, speed: '140 km/h', updated: true },
    { num: 5, speed: '120 km/h', updated: true, problematic: true },
    { num: 6, speed: '115 - 120 km/h', updated: false },
    { num: 7, speed: '135 km/h', updated: true },
    { num: 8, speed: '130 km/h', updated: false },
    { num: 9, speed: '140 km/h', updated: false },
    { num: 10, speed: '85 km/h', updated: true },
    { num: 11, speed: '145 km/h', updated: true },
    { num: 12, speed: '130 km/h', updated: true },
    { num: 13, speed: '130 km/h', updated: false },
    { num: 14, speed: '140 km/h', updated: false },
    { num: 15, speed: '135 km/h', updated: false },
    { num: 16, speed: '130 km/h', updated: false },
    { num: 17, speed: '115 km/h', updated: true },
    { num: 18, speed: '110 km/h', updated: true },
    { num: 19, speed: '145 km/h', updated: true },
    { num: 20, speed: '90 km/h', updated: false },
    { num: 21, speed: '185 km/h', updated: false },
    { num: 22, speed: '155 km/h', updated: true },
    { num: 23, speed: '180 km/h', updated: true },
    { num: 24, speed: '90 km/h', updated: false },
    { num: 25, speed: '175 km/h', updated: true },
    { num: 26, speed: '90 km/h', updated: false },
    { num: 27, speed: '140 km/h', updated: false },
    { num: 28, speed: '120 km/h', updated: false },
    { num: 29, speed: '160 km/h', updated: true },
    { num: 30, speed: '150 km/h', updated: true },
    { num: 31, speed: '150 km/h', updated: true },
    { num: 32, speed: '120 km/h', updated: true },
    { num: 33, speed: '110 km/h', updated: false },
    { num: 34, speed: '135 km/h', updated: false },
    { num: 35, speed: '110 km/h', updated: false },
    { num: 36, speed: '110 km/h', updated: false },
    { num: 37, speed: '140 km/h', updated: false },
    { num: 38, speed: '80 km/h', updated: false },
    { num: 39, speed: '110 km/h', updated: false },
    { num: 41, speed: '160 km/h', updated: false },
    { num: 42, speed: '95 km/h', updated: false },
    { num: 43, speed: '140 km/h', updated: true },
    { num: 44, speed: '185 km/h', updated: true },
    { num: 45, speed: '170 km/h', updated: true },
    { num: 46, speed: '135 km/h', updated: false },
    { num: 47, speed: '90 - 105 km/h', updated: false },
    { num: 48, speed: '125 km/h', updated: false },
    { num: 49, speed: '125 km/h', updated: true },
    { num: 50, speed: '115 km/h', updated: true },
    { num: 51, speed: '95 km/h', updated: false },
    { num: 52, speed: '120 km/h', updated: false },
    { num: 53, speed: '175 km/h', updated: true },
    { num: 54, speed: '135 km/h', updated: true },
    { num: 55, speed: '137 km/h', updated: true },
    { num: 56, speed: '130 km/h', updated: true },
    { num: 57, speed: '110 km/h', updated: false }
];


const stuntsContainer = document.getElementById('stuntsContainer');

// Generate stunt cards
STUNTS.forEach(function (stunt, index) {
    const item = document.createElement('div');
    item.className = 'stunt-card stagger-in' + (stunt.updated ? '' : ' stunt-outdated');
    item.style.animationDelay = (index * 0.02) + 's';

    item.innerHTML = `
    <span class="stunt-num">${stunt.problematic ? '🔻 ' : ''}Stunt ${stunt.num}</span>
    <span class="stunt-speed">${stunt.speed}</span>
`;

    stuntsContainer.appendChild(item);
});