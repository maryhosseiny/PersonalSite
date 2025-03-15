document.addEventListener('DOMContentLoaded', () => {
    // Dark mode functionality
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeMenu = document.getElementById('themeMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        darkModeToggle.checked = savedTheme === 'dark';
    }

    // Toggle theme menu
    themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('active');
    });

    // Close theme menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeMenu.contains(e.target) && !themeToggleBtn.contains(e.target)) {
            themeMenu.classList.remove('active');
        }
    });

    // Handle dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        const theme = darkModeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('.section');

    function switchTab(targetId) {
        // Remove active class from all tabs and sections
        tabs.forEach(tab => tab.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding section
        const activeTab = document.querySelector(`[href="#${targetId}"]`);
        const activeSection = document.getElementById(targetId);
        
        if (activeTab && activeSection) {
            activeTab.classList.add('active');
            activeSection.classList.add('active');
        }
    }

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('href').substring(1);
            switchTab(targetId);
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const targetId = window.location.hash.substring(1) || 'welcome';
        switchTab(targetId);
    });

    // Gallery shuffling functionality
    function shuffleGallery() {
        const gallery = document.getElementById('gallery-grid');
        if (!gallery) return;
        
        const items = Array.from(gallery.children);
        
        // Fisher-Yates shuffle algorithm
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            gallery.appendChild(items[j]);
        }
    }

    // Shuffle gallery when the page loads
    shuffleGallery();

    // Handle initial load
    const hash = window.location.hash.substring(1);
    switchTab(hash || 'welcome');

    // Contact Modal
    const modal = document.getElementById('contactModal');
    const contactBtn = document.getElementById('contactBtn');
    const closeBtn = document.querySelector('.close-btn');

    contactBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 