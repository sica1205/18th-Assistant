// ===== Performance mode toggle =====
// Disables the floating particle effects to reduce animation load.
const perfBtn = document.getElementById('perfBtn');
const perfIconOff = document.getElementById('perfIconOff');
const perfIconOn = document.getElementById('perfIconOn');
let isPerfOn = false;

function setPerformance(on) {
    isPerfOn = on;
    document.body.classList.toggle('perf-on', on);
    perfBtn.classList.toggle('active', on);
    perfIconOff.classList.toggle('hidden', on);
    perfIconOn.classList.toggle('hidden', !on);
    localStorage.setItem('18th-perf', on ? 'on' : 'off');
}

function togglePerformance() {
    setPerformance(!isPerfOn);
}

// Load saved preference
document.addEventListener('DOMContentLoaded', function () {
    setPerformance(localStorage.getItem('18th-perf') === 'on');
});