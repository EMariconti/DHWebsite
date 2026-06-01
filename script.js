// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// Publication keyword filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');
const pubYearGroups = document.querySelectorAll('.pub-year-group');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        pubItems.forEach(item => {
            const keywords = item.dataset.keywords || '';
            const match = filter === 'all' || keywords.split(' ').includes(filter);
            item.classList.toggle('hidden', !match);
        });

        pubYearGroups.forEach(group => {
            const visible = group.querySelectorAll('.pub-item:not(.hidden)').length;
            group.style.display = visible === 0 ? 'none' : '';
        });
    });
});

// Auto-apply filter from URL parameter — must come AFTER filter buttons are set up
const params = new URLSearchParams(window.location.search);
const presetFilter = params.get('filter');

if (presetFilter) {
    const matchingBtn = document.querySelector(`.filter-btn[data-filter="${presetFilter}"]`);
    if (matchingBtn) matchingBtn.click();
}