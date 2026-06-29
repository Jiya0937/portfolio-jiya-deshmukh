document.addEventListener('DOMContentLoaded', () => {
    // Initialize functions
    initDynamicGreeting();
    initStickyHeader();
    initScrollProgressBar();
    initMobileNavigation();
    initEntranceAnimation();
    initCVDownloadFeedback();
});

/**
 * 1. Dynamic Greeting based on Local Time
 */
function initDynamicGreeting() {
    const greetingTextElement = document.getElementById('greetingText');
    if (!greetingTextElement) return;

    const currentHour = new Date().getHours();
    let greeting = "Good morning, I'm";

    if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon, I'm";
    } else if (currentHour >= 17 && currentHour < 24) {
        greeting = "Good evening, I'm";
    } else {
        greeting = "Hello, I'm"; // Early morning catch
    }

    greetingTextElement.textContent = greeting;
}

/**
 * 2. Sticky Header styling on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.navbar-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page loads scrolled down
}

/**
 * 3. Dynamic top page scroll indicator
 */
function initScrollProgressBar() {
    const progress = document.getElementById('scrollProgress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const percentage = (window.scrollY / totalScrollHeight) * 100;
            progress.style.width = `${percentage}%`;
        } else {
            progress.style.width = '0%';
        }
    });
}

/**
 * 4. Mobile burger menu toggle drawer
 */
function initMobileNavigation() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-item');

    if (!toggle || !menu) return;

    const toggleMenu = () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    };

    toggle.addEventListener('click', toggleMenu);

    // Close menu when navigation item clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });
}

/**
 * 5. Button interactive click feedback on Download CV button
 */
function initCVDownloadFeedback() {
    const downloadBtn = document.getElementById('btnDownload');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', (e) => {
        const btnText = downloadBtn.querySelector('span');
        const originalText = btnText.textContent;
        
        // Visual cue feedback
        btnText.textContent = "Downloading...";
        downloadBtn.style.pointerEvents = 'none';
        downloadBtn.style.opacity = '0.85';

        setTimeout(() => {
            btnText.textContent = "Resume Downloaded!";
            
            setTimeout(() => {
                btnText.textContent = originalText;
                downloadBtn.style.pointerEvents = 'auto';
                downloadBtn.style.opacity = '1';
            }, 2000);
        }, 1200);
    });
}

/**
 * 6. Staggered fade-in entrance animation sequence
 */
function initEntranceAnimation() {
    // Add base transition properties dynamically for a clean, clean code architecture
    const animatedElements = [
        { id: '#greetingBadge', delay: 100 },
        { id: '#heroTitle', delay: 250 },
        { id: '#heroSubtitle', delay: 400 },
        { id: '#heroDescription', delay: 550 },
        { id: '.hero-actions', delay: 700 },
        { id: '.hero-socials', delay: 850 },
        { id: '.editorial-frame-container', delay: 350 }
    ];

    animatedElements.forEach(item => {
        const el = document.querySelector(item.id);
        if (el) {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Set reveal sequence
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, item.delay);
        }
    });
}
