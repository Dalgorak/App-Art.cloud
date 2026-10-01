const themeToggle = document.getElementById('themeToggle');
const sunIcon = themeToggle.innerHTML;
const moonIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5z"></path></svg>';

function applyTheme(light) {
    document.documentElement.classList.toggle('light', light);
    themeToggle.setAttribute('aria-pressed', light ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', light ? 'Dunkle Darstellung' : 'Helle Darstellung');
    themeToggle.innerHTML = light ? moonIcon : sunIcon;
    try {
        localStorage.setItem('theme', light ? 'light' : 'dark');
    } catch (e) {}
}

themeToggle.addEventListener('click', function () {
    applyTheme(!document.documentElement.classList.contains('light'));
});

if (document.documentElement.classList.contains('light')) {
    applyTheme(true);
}
