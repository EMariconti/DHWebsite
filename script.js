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

// News rendering — reads from NEWS_ITEMS (defined in news-data.js)
// Renders a single news-card for a given item
function renderNewsCard(item) {
    return `
        <article class="news-card">
            <time>${item.date}</time>
            <p>${item.html}</p>
        </article>
    `;
}

// Home page: show only the 3 latest items
const newsListHome = document.getElementById('news-list-home');
if (newsListHome && typeof NEWS_ITEMS !== 'undefined') {
    newsListHome.innerHTML = NEWS_ITEMS.slice(0, 3).map(renderNewsCard).join('');
}

// News page: show the full list
const newsListFull = document.getElementById('news-list-full');
if (newsListFull && typeof NEWS_ITEMS !== 'undefined') {
    newsListFull.innerHTML = NEWS_ITEMS.map(renderNewsCard).join('');
}