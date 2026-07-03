// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle?.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navigation Active State
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        updateActiveNav();
    }

    window.addEventListener('scroll', updateNavbarBackground);
    window.addEventListener('load', updateActiveNav);

    // Animated Counters
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function updateCounter() {
            current += step;
            if (current >= target) {
                element.textContent = target;
            } else {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        }
        updateCounter();
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Animate counters when they come into view
                const counters = entry.target.querySelectorAll('.stat-number[data-count]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    // FAQ Functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (i === index) {
                testimonial.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Coverage Map Pin Interactions
    document.querySelectorAll('.pin').forEach(pin => {
        pin.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.querySelector('.pin-glow').style.animation = 'pulse-glow 1s ease-in-out infinite';
        });

        pin.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.querySelector('.pin-glow').style.animation = 'pulse-glow 2s ease-in-out infinite';
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax Effect for Hero Video
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVideo = document.querySelector('.hero-video video');
        if (heroVideo) {
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        }
    });

    // Loading Animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // Trigger initial counter animations for visible elements
        document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounter(counter);
                counter.classList.add('animated');
            }
        });
    });

    // Form Validation and Enhancement (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // Lazy Loading for Images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Performance Monitoring
    function checkPerformance() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime + 'ms');
            }
        }
    }

    // Check performance after load
    window.addEventListener('load', () => {
        setTimeout(checkPerformance, 1000);
    });

    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        // Enable keyboard navigation for carousel
        if (e.key === 'ArrowLeft') {
            const prevIndex = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
            currentTestimonial = prevIndex;
            showTestimonial(currentTestimonial);
        } else if (e.key === 'ArrowRight') {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            currentTestimonial = nextIndex;
            showTestimonial(currentTestimonial);
        }
    });

    // Error Handling for Video
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            console.warn('Hero video failed to load, showing fallback');
            const heroSection = document.querySelector('.hero');
            heroSection.style.background = 'var(--gradient-background)';
        });
    }

    // Service Worker Registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Note: Service worker file would need to be created separately
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered'))
            //     .catch(error => console.log('SW registration failed'));
        });
    }

    // Accessibility Improvements
    function improveAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-cyan);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content id
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.id = 'main-content';
            hero.setAttribute('tabindex', '-1');
        }
    }

    improveAccessibility();

    // Dark Mode Toggle (future enhancement)
    function initDarkModeToggle() {
        const darkModePreference = localStorage.getItem('darkMode');
        if (darkModePreference === 'disabled') {
            document.body.classList.add('light-mode');
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
            'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources();
});

// Global Error Handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Could send to analytics service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to analytics service
});

// Performance Observer (for monitoring)
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        });
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}