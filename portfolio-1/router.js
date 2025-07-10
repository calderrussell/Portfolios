class Router {
    constructor() {
        this.routes = {
            'home': 'content/home.html',
            'about': 'content/about.html',
            'projects': 'content/projects.html',
            'contact': 'content/contact.html',

            // Project detail pages
            'bike': 'content/projects/bike.html',
            'cave': 'content/projects/cave.html',
            'nasa': 'content/projects/NASA.html',
            'motor': 'content/projects/motor.html',
            'ml': 'content/projects/ML.html',
            'cubesat': 'content/projects/cubesat.html',
            'llm': 'content/projects/LLM.html',
            'race': 'content/projects/race.html'
        };

        this.pageTitles = {
            'home': 'Calder Russell - Portfolio',
            'about': 'About Me - Calder Russell',
            'projects': 'Projects - Calder Russell',
            'contact': 'Contact Me - Calder Russell',

            // Project page titles
            'bike': 'Electric Bike Project - Calder Russell',
            'cave': 'Cave Lab Project - Calder Russell',
            'nasa': 'NASA Project - Calder Russell',
            'motor': 'Motor Project - Calder Russell',
            'ml': 'ML Project - Calder Russell',
            'cubesat': 'CubeSat Project - Calder Russell',
            'llm': 'LLM Project - Calder Russell',
            'race': 'Statistical Analysis - Calder Russell'
        };

        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    }

    registerRoute(route, path, title = null) {
        this.routes[route] = path;
        if (title) {
            this.pageTitles[route] = title;
        }
        console.log(`📄 Route registered: ${route} -> ${path}`);
    }

    handleRoute() {
        const hash = window.location.hash.substring(1) || 'home';
        this.loadPage(hash);
    }

    navigateTo(page) {
        window.location.hash = page;
    }

    async loadPage(page) {
        try {
            this.updateActiveNav(page);

            document.getElementById('page-title').textContent =
                this.pageTitles[page] || `${this.capitalizeFirst(page)} - Calder Russell`;

            if (!this.routes[page]) {
                throw new Error(`Route "${page}" not found`);
            }

            const response = await fetch(this.routes[page]);
            if (!response.ok) throw new Error(`Failed to load ${page}`);

            const content = await response.text();
            document.getElementById('content-area').innerHTML = content;

            this.initializePage(page);

            console.log(`✅ Loaded page: ${page} from ${this.routes[page]}`);

        } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('content-area').innerHTML = `
                <div class="error-page">
                    <h2>Page not found</h2>
                    <p>The page "${page}" could not be loaded.</p>
                    <a href="#home" class="cta-button">Go Home</a>
                </div>
            `;
        }
    }

    updateActiveNav(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    initializePage(page) {
        if (page === 'contact') {
            this.initContactForm();
        } else if (page === 'projects') {
            this.initProjects();
        }

        // Look for page-specific init functions
        const initFunctionName = `init${this.capitalizeFirst(page)}Page`;
        if (typeof window[initFunctionName] === 'function') {
            window[initFunctionName]();
        }

        if (typeof initBlobEffect === 'function') {
            initBlobEffect();
        }
    }

    initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Message sent! (This is a demo - implement your own form handler)');
            });
        }
    }

    initProjects() {
        console.log('Projects page initialized');
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

window.registerRoute = function (route, path, title) {
    if (window.router) {
        window.router.registerRoute(route, path, title);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
});
