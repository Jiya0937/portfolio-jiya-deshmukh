document.addEventListener('DOMContentLoaded', () => {
    // Initialize functions
    initDynamicGreeting();
    initStickyHeader();
    initScrollProgressBar();
    initMobileNavigation();
    initEntranceAnimation();
    initCVDownloadFeedback();
    initScrollSpy();
    initAboutSectionReveal();
    initSkillsSectionReveal();
    initProjectsSectionReveal();
    initProjectFilter();
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

/**
 * 7. Navigation Scroll Spy (Active link indicator on scroll)
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    const handleSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset to trigger slightly before center screen

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleSpy);
    handleSpy(); // Initialize once on page load
}

/**
 * 8. Scroll Reveal entrance sequences for About Section using Intersection Observer
 */
function initAboutSectionReveal() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const elementsToReveal = [
        { selector: '#aboutHeading', delay: 100 },
        { selector: '#aboutSubtitle', delay: 220 },
        { selector: '#aboutDescription', delay: 350 },
        { selector: '#aboutCards', delay: 480 },
        { selector: '.illustration-frame', delay: 180 },
        { selector: '.about-visual-badge', delay: 300 }
    ];

    // Set initial state
    elementsToReveal.forEach(item => {
        const el = aboutSection.querySelector(item.selector);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    // Create observer
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger transition triggers
                elementsToReveal.forEach(item => {
                    const el = aboutSection.querySelector(item.selector);
                    if (el) {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, item.delay);
                    }
                });
                // Unobserve section once revealed
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12 // Trigger when 12% is visible
    });

    observer.observe(aboutSection);
}

/**
 * 9. Scroll Reveal entrance sequences for Skills Section using Intersection Observer
 */
function initSkillsSectionReveal() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const skillsHeader = document.getElementById('skillsHeader');
    const skillsCards = skillsSection.querySelectorAll('.skills-card');

    // Set initial state for header
    if (skillsHeader) {
        skillsHeader.style.opacity = '0';
        skillsHeader.style.transform = 'translateY(30px)';
        skillsHeader.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Set initial state for cards
    skillsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease';
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal header
                if (skillsHeader) {
                    skillsHeader.style.opacity = '1';
                    skillsHeader.style.transform = 'translateY(0)';
                }

                // Reveal cards with staggered delay
                skillsCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        // Add revealed class to trigger progress bar animations
                        card.classList.add('revealed');
                    }, 200 + index * 150);
                });

                // Unobserve section once revealed
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% is visible
    });

    observer.observe(skillsSection);
}

/**
 * 10. Scroll Reveal entrance sequences for Projects Section using Intersection Observer
 */
function initProjectsSectionReveal() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const header = document.getElementById('projectsHeader');
    const filter = document.getElementById('projectsFilter');
    const grid = document.getElementById('projectsGrid');
    const cta = document.getElementById('projectsCta');

    const elementsToReveal = [
        { el: header, delay: 100 },
        { el: filter, delay: 220 },
        { el: grid, delay: 350 },
        { el: cta, delay: 480 }
    ];

    // Set initial state
    elementsToReveal.forEach(item => {
        if (item.el) {
            item.el.style.opacity = '0';
            item.el.style.transform = 'translateY(30px)';
            item.el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                elementsToReveal.forEach(item => {
                    if (item.el) {
                        setTimeout(() => {
                            item.el.style.opacity = '1';
                            item.el.style.transform = 'translateY(0)';
                        }, item.delay);
                    }
                });
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08 // Trigger when 8% is visible
    });

    observer.observe(projectsSection);
}

/**
 * 11. Dynamic Project Client-side Filtering Logic
 */
function initProjectFilter() {
    const filterContainer = document.getElementById('projectsFilter');
    const grid = document.getElementById('projectsGrid');
    if (!filterContainer || !grid) return;

    const buttons = filterContainer.querySelectorAll('.filter-btn');
    const cards = grid.querySelectorAll('.project-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('filtered-out');
                    // Reset inline styling so animations reset smoothly
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });
}
