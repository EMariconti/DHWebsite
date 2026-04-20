// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}
