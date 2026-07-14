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
    initContactSectionReveal();
    initContactForm();
    initAchievementsSectionReveal();
    initAchievementsTabs();
    initAcademicsSectionReveal();
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
 * 12. Scroll Reveal entrance sequences for Contact Section using Intersection Observer
 */
function initContactSectionReveal() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const header = document.getElementById('contactHeader');
    const content = document.getElementById('contactContent');

    const elementsToReveal = [
        { el: header, delay: 100 },
        { el: content, delay: 280 }
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

    observer.observe(contactSection);
}

/**
 * 13. Contact Form validation, EmailJS submission, and Toast alerts
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Optional EmailJS Public Key placeholder setup
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Recruiters can swap this easily
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    }

    const inputName = document.getElementById('formName');
    const inputEmail = document.getElementById('formEmail');
    const inputSubject = document.getElementById('formSubject');
    const inputMessage = document.getElementById('formMessage');
    const btnSubmit = document.getElementById('btnSubmit');

    // Input listeners to clear errors on typing
    const inputs = [inputName, inputEmail, inputSubject, inputMessage];
    inputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (group) group.classList.remove('has-error');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // 1. Validate Full Name
        if (!inputName.value.trim()) {
            showInputError(inputName, "Full name is required");
            isValid = false;
        }

        // 2. Validate Email
        const emailVal = inputEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            showInputError(inputEmail, "Email address is required");
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            showInputError(inputEmail, "Please enter a valid email address");
            isValid = false;
        }

        // 3. Validate Subject
        if (!inputSubject.value.trim()) {
            showInputError(inputSubject, "Subject is required");
            isValid = false;
        }

        // 4. Validate Message
        if (!inputMessage.value.trim()) {
            showInputError(inputMessage, "Message content is required");
            isValid = false;
        }

        if (!isValid) {
            showToast("Please fill in all required fields correctly.", "error");
            return;
        }

        // Set Loading State
        const originalBtnHTML = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `
            <span>Sending...</span>
            <svg class="btn-submit-icon rotating" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
        `;

        // If EmailJS is properly initialized, trigger real send
        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: inputName.value.trim(),
                reply_to: inputEmail.value.trim(),
                subject: inputSubject.value.trim(),
                message: inputMessage.value.trim()
            })
            .then(() => {
                showToast("Message sent successfully!", "success");
                form.reset();
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = originalBtnHTML;
            })
            .catch((err) => {
                console.error("EmailJS sending error: ", err);
                showToast("Failed to send message. Please try again.", "error");
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = originalBtnHTML;
            });
        } else {
            // Simulated submission fallback
            setTimeout(() => {
                showToast("Message sent successfully!", "success");
                form.reset();
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = originalBtnHTML;
                console.info("EmailJS is not fully configured yet. Simulated sending was successful.");
            }, 1500);
        }
    });
}

function showInputError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    
    group.classList.add('has-error');
    
    // Dynamically update message if element exists
    const errorSpan = group.querySelector('.form-error-msg');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

/**
 * 14. Toast Notification Creator
 */
function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item ${type === 'error' ? 'error' : ''}`;

    const iconClass = type === 'error' ? 'error' : 'success';
    const iconSvg = type === 'error' 
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

    toast.innerHTML = `
        <div class="toast-icon-wrapper ${iconClass}">
            ${iconSvg}
        </div>
        <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    // Fade and slide in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
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

/**
 * 15. Scroll Reveal entrance sequences for Achievements Section using Intersection Observer
 */
function initAchievementsSectionReveal() {
    const achievementsSection = document.getElementById('achievements');
    if (!achievementsSection) return;

    const header = document.getElementById('achievementsHeader');
    const statsGrid = document.getElementById('statsGrid');
    const tabs = document.getElementById('tabsControl');
    const quote = document.getElementById('achievementsQuote');

    const elementsToReveal = [
        { el: header, delay: 100 },
        { el: statsGrid, delay: 280 },
        { el: tabs, delay: 420 },
        { el: quote, delay: 560 }
    ];

    // Set initial state
    elementsToReveal.forEach(item => {
        if (item.el) {
            item.el.style.opacity = '0';
            item.el.style.transform = 'translateY(30px)';
            item.el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    let statsAnimated = false;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                elementsToReveal.forEach(item => {
                    if (item.el) {
                        setTimeout(() => {
                            item.el.style.opacity = '1';
                            item.el.style.transform = 'translateY(0)';
                            
                            // Trigger stats counting animation once
                            if (item.el === statsGrid && !statsAnimated) {
                                statsAnimated = true;
                                animateStatsCounters();
                            }
                        }, item.delay);
                    }
                });
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08
    });

    observer.observe(achievementsSection);
}

/**
 * 16. Statistics Counter Animation logic
 */
function animateStatsCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 1500; // 1.5s total animation speed

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        const start = 0;
        let startTime = null;

        function updateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Linear progression calculation
            const current = start + percentage * (target - start);
            counter.textContent = current.toFixed(decimals);

            if (percentage < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target.toFixed(decimals);
            }
        }

        requestAnimationFrame(updateCount);
    });
}

/**
 * 17. Achievements Interactive Tabs controller logic
 */
function initAchievementsTabs() {
    const tabsControl = document.getElementById('tabsControl');
    if (!tabsControl) return;

    const buttons = tabsControl.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Set button state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding panel and hide others
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === `${targetTab}Panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * 18. Scroll Reveal entrance sequences for Academics Section using Intersection Observer
 */
function initAcademicsSectionReveal() {
    const academicsSection = document.getElementById('academics');
    if (!academicsSection) return;

    const header = document.getElementById('academicsHeader');
    const statsGrid = document.getElementById('academicsStatsGrid');
    const timeline = document.getElementById('academicsTimeline');
    const timelineItems = timeline ? timeline.querySelectorAll('.timeline-item') : [];
    const coursework = document.getElementById('courseworkWrapper');

    // Hide elements initially
    const primaryElements = [header, statsGrid, coursework];
    primaryElements.forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(35px)';
            el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        const card = item.querySelector('.timeline-card');
        
        if (marker) {
            marker.style.opacity = '0';
            marker.style.transform = 'translateX(-50%) scale(0.6)';
            marker.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        if (card) {
            card.style.opacity = '0';
            const isLeft = item.classList.contains('timeline-left');
            card.style.transform = isLeft ? 'translateX(-35px) translateY(15px)' : 'translateX(35px) translateY(15px)';
            card.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    let statsAnimated = false;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Reveal Header
                setTimeout(() => {
                    if (header) {
                        header.style.opacity = '1';
                        header.style.transform = 'translateY(0)';
                    }
                }, 100);

                // 2. Reveal Stats Grid and Trigger Countup
                setTimeout(() => {
                    if (statsGrid) {
                        statsGrid.style.opacity = '1';
                        statsGrid.style.transform = 'translateY(0)';
                        if (!statsAnimated) {
                            statsAnimated = true;
                            animateAcademicStats();
                        }
                    }
                }, 280);

                // 3. Staggered reveal of timeline items
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        const marker = item.querySelector('.timeline-marker');
                        const card = item.querySelector('.timeline-card');
                        
                        if (marker) {
                            marker.style.opacity = '1';
                            marker.style.transform = 'translateX(-50%) scale(1)';
                        }
                        if (card) {
                            card.style.opacity = '1';
                            card.style.transform = 'translateX(0) translateY(0)';
                        }
                    }, 480 + index * 220);
                });

                // 4. Reveal Coursework Section
                setTimeout(() => {
                    if (coursework) {
                        coursework.style.opacity = '1';
                        coursework.style.transform = 'translateY(0)';
                    }
                }, 580 + timelineItems.length * 220);

                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05
    });

    observer.observe(academicsSection);
}

/**
 * 19. Academic Statistics Counter Animation logic
 */
function animateAcademicStats() {
    const counters = document.querySelectorAll('.academic-stat-number');
    const duration = 1500; // 1.5s total animation speed

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        const start = 0;
        let startTime = null;

        function updateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Linear progression calculation
            const current = start + percentage * (target - start);
            counter.textContent = current.toFixed(decimals);

            if (percentage < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target.toFixed(decimals);
            }
        }

        requestAnimationFrame(updateCount);
3    });
}
