// Anime.js Animations - AutoCAD Guía
(function() {
    'use strict';

    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded');
        return;
    }

    // ============================================
    // HERO ANIMATIONS
    // ============================================
    
    // Hero badge animation
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        anime({
            targets: '.hero-badge',
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 800,
            delay: 300,
            easing: 'easeOutExpo'
        });

        // Hero title animation
        anime({
            targets: '.hero-text h1',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 500,
            easing: 'easeOutExpo'
        });

        // Hero description
        anime({
            targets: '.hero-text p',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: 700,
            easing: 'easeOutExpo'
        });

        // Hero buttons
        anime({
            targets: '.hero-actions a',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: anime.stagger(100, {start: 900}),
            easing: 'easeOutExpo'
        });

        // Hero stats
        anime({
            targets: '.stat',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            delay: anime.stagger(100, {start: 1100}),
            easing: 'easeOutBack'
        });
    }

    // Stats numbers count up
    const statNumbers = document.querySelectorAll('.stat .number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const num = parseInt(text);
        
        if (!isNaN(num)) {
            anime({
                targets: stat,
                innerHTML: [0, num],
                duration: 2000,
                delay: 1300,
                round: 1,
                easing: 'easeOutExpo',
                update: function(anim) {
                    stat.textContent = Math.floor(anim.animatables[0].target.innerHTML);
                    if (hasPlus) stat.textContent += '+';
                }
            });
        }
    });

    // Hero visual (3D stage entrance)
    anime({
        targets: '.cube-3d',
        scale: [0.4, 1],
        opacity: [0, 1],
        duration: 1400,
        delay: 500,
        easing: 'easeOutExpo'
    });

    // Floating stat icons (continuous subtle motion)
    anime({
        targets: '.stat-icon',
        translateY: [0, -4],
        duration: 1600,
        delay: anime.stagger(150, { start: 2200 }),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // ============================================
    // NAVIGATION ANIMATIONS
    // ============================================

    // Navbar entrance
    anime({
        targets: '#navbar',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 600,
        easing: 'easeOutExpo'
    });

    // Nav links stagger
    anime({
        targets: '.nav-links li',
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        delay: anime.stagger(50, {start: 200}),
        easing: 'easeOutExpo'
    });

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    // Section labels
    anime({
        targets: '.section-label',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 100
    });

    // Section titles with scroll trigger
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        titleObserver.observe(title);
    });

    // Section descriptions
    const sectionDescs = document.querySelectorAll('.section-desc');
    const descObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    delay: 150,
                    easing: 'easeOutExpo'
                });
                descObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sectionDescs.forEach(desc => {
        desc.style.opacity = '0';
        descObserver.observe(desc);
    });

    // ============================================
    // CARD ANIMATIONS
    // ============================================

    // Path cards
    const pathCards = document.querySelectorAll('.path-card');
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [40, 0],
                    scale: [0.95, 1],
                    duration: 800,
                    delay: index * 150,
                    easing: 'easeOutBack'
                });
                pathObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    pathCards.forEach(card => {
        card.style.opacity = '0';
        pathObserver.observe(card);
    });

    // Module cards
    const moduleCards = document.querySelectorAll('.module-card');
    const moduleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    delay: index * 100,
                    easing: 'easeOutExpo'
                });
                moduleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    moduleCards.forEach(card => {
        card.style.opacity = '0';
        moduleObserver.observe(card);
    });

    // ============================================
    // 3D SECTION ANIMATIONS
    // ============================================

    const canvas3dContainer = document.querySelector('.canvas-3d-container');
    if (canvas3dContainer) {
        const canvasObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        scale: [0.95, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                    canvasObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        canvas3dContainer.style.opacity = '0';
        canvasObserver.observe(canvas3dContainer);
    }

    // ============================================
    // SHORTCUTS TABLE ANIMATION
    // ============================================

    const shortcutsTable = document.querySelector('.shortcuts-table tbody');
    if (shortcutsTable) {
        const tableRows = shortcutsTable.querySelectorAll('tr');
        const tableObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: tableRows,
                        opacity: [0, 1],
                        translateX: [-20, 0],
                        duration: 400,
                        delay: anime.stagger(50),
                        easing: 'easeOutExpo'
                    });
                    tableObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        tableRows.forEach(row => row.style.opacity = '0');
        tableObserver.observe(shortcutsTable);
    }

    // ============================================
    // MICRO-INTERACTIONS
    // ============================================

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-control');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });

        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });

        btn.addEventListener('mousedown', () => {
            anime({
                targets: btn,
                scale: 0.95,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });

        btn.addEventListener('mouseup', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 100,
                easing: 'easeOutQuad'
            });
        });
    });

    // Module card hover effects
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -8,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            const icon = card.querySelector('.module-icon');
            if (icon) {
                anime({
                    targets: icon,
                    scale: 1.2,
                    rotate: '+=10',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            const icon = card.querySelector('.module-icon');
            if (icon) {
                anime({
                    targets: icon,
                    scale: 1,
                    rotate: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    });

    // Key press animation for shortcut keys
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('mouseenter', () => {
            anime({
                targets: key,
                scale: [1, 1.2, 1],
                backgroundColor: ['rgba(0, 120, 212, 0.1)', 'rgba(0, 120, 212, 0.3)', 'rgba(0, 120, 212, 0.1)'],
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });

    // ============================================
    // BACK TO TOP ANIMATION
    // ============================================

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('mouseenter', () => {
            anime({
                targets: backToTop,
                scale: 1.1,
                translateY: -3,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });

        backToTop.addEventListener('mouseleave', () => {
            anime({
                targets: backToTop,
                scale: 1,
                translateY: 0,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    }

    // ============================================
    // FOOTER ANIMATION
    // ============================================

    const footer = document.querySelector('.footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.footer-grid > *',
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: anime.stagger(100),
                        easing: 'easeOutExpo'
                    });
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        footerObserver.observe(footer);
    }

    // ============================================
    // PAGE TRANSITION EFFECT
    // ============================================

    // Fade in page on load
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
    });

    // Add smooth transitions to internal links only
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only animate internal links (not external, not anchors, not protocol-relative)
            if (href && 
                !href.startsWith('#') && 
                !href.startsWith('http') && 
                !href.startsWith('//') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:')) {
                e.preventDefault();
                anime({
                    targets: 'body',
                    opacity: [1, 0],
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });

    console.log('🎨 Anime.js animations loaded successfully!');

})();
