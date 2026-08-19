// ===== Dark mode toggle =====
const themeBtn = document.getElementById('themeBtn');
const themeIconSun = document.getElementById('themeIconSun');
const themeIconMoon = document.getElementById('themeIconMoon');
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);

    if (isDarkMode) {
        themeBtn.classList.add('dark');
        themeIconSun.classList.remove('hidden');
        themeIconMoon.classList.add('hidden');
    } else {
        themeBtn.classList.remove('dark');
        themeIconSun.classList.add('hidden');
        themeIconMoon.classList.remove('hidden');
    }

    // Save preference
    localStorage.setItem('18th-theme', isDarkMode ? 'dark' : 'light');
}

// Load saved theme preference
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('18th-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.classList.add('dark');
        themeIconSun.classList.remove('hidden');
        themeIconMoon.classList.add('hidden');
        isDarkMode = true;
    }
});