// ===== Performance mode toggle =====

const perfBtn = document.getElementById('perfBtn');
const perfIconOff = document.getElementById('perfIconOff');
const perfIconOn = document.getElementById('perfIconOn');

let isPerfOn = localStorage.getItem('18th-perf') === 'on';

function setPerformance(on) {
    isPerfOn = on;

    document.body.classList.toggle('perf-on', on);
    perfBtn.classList.toggle('active', on);
    perfIconOff.classList.toggle('hidden', on);
    perfIconOn.classList.toggle('hidden', !on);

    localStorage.setItem('18th-perf', on ? 'on' : 'off');

    // Performance ON = particles completely removed
    if (on) {
        destroyParticles();
    } else {
        createParticles();
    }
}

function togglePerformance() {
    setPerformance(!isPerfOn);
}

// Load saved preference
document.addEventListener('DOMContentLoaded', function () {
    setPerformance(isPerfOn);
});