// AutoCAD Guía - Main Application JavaScript
(function() {
    'use strict';

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));

    // Mobile hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    function closeMobileMenu() {
        if (hamburger) hamburger.classList.remove('open');
        if (navLinks) navLinks.classList.remove('open');
    }

    function toggleMobileMenu() {
        if (hamburger) hamburger.classList.toggle('open');
        if (navLinks) navLinks.classList.toggle('open');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Close menu after clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Home shortcuts search
    const shortcutSearch = document.getElementById('homeShortcutSearch');
    if (shortcutSearch) {
        const rows = document.querySelectorAll('.shortcuts-table tbody tr');
        shortcutSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
            });
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            const wasOpen = item.classList.contains('open');
            const grid = item.closest('.faq-grid');
            if (grid) {
                grid.querySelectorAll('.faq-item.open').forEach(o => {
                    if (o !== item) o.classList.remove('open');
                });
            }
            item.classList.toggle('open', !wasOpen);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                if (hamburger) hamburger.classList.remove('open');
                if (navLinks) navLinks.classList.remove('open');
            }
        });
    });

    // Scale Calculator
    window.calcScale = function() {
        const paperSelect = document.getElementById('paperSize');
        const objWidth = document.getElementById('objWidth');
        const objHeight = document.getElementById('objHeight');
        const resultDiv = document.getElementById('scaleResult');
        
        if (!paperSelect || !objWidth || !objHeight || !resultDiv) return;

        const paperSizes = {
            'A4': { w: 210, h: 297 },
            'A3': { w: 297, h: 420 },
            'A2': { w: 420, h: 594 },
            'A1': { w: 594, h: 841 },
            'A0': { w: 841, h: 1189 }
        };

        const margin = 20;
        const paper = paperSizes[paperSelect.value];
        const availW = paper.w - margin * 2;
        const availH = paper.h - margin * 2;
        const ow = parseFloat(objWidth.value) || 100;
        const oh = parseFloat(objHeight.value) || 100;

        const scaleX = availW / ow;
        const scaleY = availH / oh;
        const scale = Math.min(scaleX, scaleY);
        const scaleInt = Math.floor(scale);

        // Find nearest standard scale
        const standards = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000];
        let bestScale = standards[0];
        for (const s of standards) {
            if (s <= scaleInt) bestScale = s;
        }

        const utilization = ((ow * bestScale / availW) * (oh * bestScale / availH) * 100).toFixed(1);
        
        resultDiv.innerHTML = `
            <div class="scale-value">1:${bestScale}</div>
            <p style="margin-top: 10px; color: var(--text-dim);">Utilización del papel: ${utilization}%</p>
            <p style="color: var(--text-dim);">Espacio disponible: ${availW} × ${availH} mm</p>
        `;
    };

    // Mini Simulator
    window.simCmd = function(cmd) {
        const info = document.getElementById('simInfo');
        const status = document.getElementById('simStatus');
        const s1 = document.getElementById('simShape1');
        const s2 = document.getElementById('simShape2');

        if (!info || !s1) return;

        const commands = {
            'move': { text: 'MOVER - El objeto ha sido desplazado 50 unidades a la derecha', action: () => { s1.style.transform = 'translateX(50px)'; }},
            'copy': { text: 'COPIAR - Se ha creado una copia del objeto', action: () => { s2.style.display = 'block'; s2.style.transform = 'translateX(80px) translateY(30px)'; }},
            'rotate': { text: 'GIRAR - El objeto ha sido rotado 45°', action: () => { s1.style.transform = 'rotate(45deg)'; }},
            'scale': { text: 'ESCALAR - El objeto ha sido escalado al 150%', action: () => { s1.style.transform = 'scale(1.5)'; }},
            'mirror': { text: 'SIMETRÍA - Se ha creado un reflejo del objeto', action: () => { s2.style.display = 'block'; s2.style.transform = 'scaleX(-1) translateX(-80px)'; }},
            'offset': { text: 'DESFASE - Se ha creado una línea paralela', action: () => {}},
            'fillet': { text: 'EMPALME - La esquina ha sido redondeada', action: () => { s1.style.borderRadius = '20px'; }},
            'array': { text: 'MATRIZ - Se ha creado un patrón de copias', action: () => {}},
            'erase': { text: 'BORRAR - El objeto ha sido eliminado', action: () => { s1.style.opacity = '0.3'; }},
            'reset': { text: 'RESTABLECER - Todo ha vuelto a su estado original', action: () => {
                s1.style.transform = '';
                s1.style.borderRadius = '';
                s1.style.opacity = '1';
                s2.style.display = 'none';
            }}
        };

        const cmdData = commands[cmd.toLowerCase()];
        if (cmdData) {
            info.textContent = cmdData.text;
            info.style.color = 'var(--green)';
            if (status) {
                status.textContent = cmd.toUpperCase();
                status.style.background = 'rgba(0, 120, 212, 0.15)';
                status.style.color = 'var(--blue-light)';
            }
            cmdData.action();
        }
    };

    // Simulator coordinate tracking
    const simCanvas = document.getElementById('simCanvas');
    const simCoord = document.getElementById('simCoord');
    
    if (simCanvas && simCoord) {
        simCanvas.addEventListener('mousemove', (e) => {
            const rect = simCanvas.getBoundingClientRect();
            const x = (e.clientX - rect.left).toFixed(1);
            const y = (rect.height - (e.clientY - rect.top)).toFixed(1);
            simCoord.textContent = `${x}, ${y}, 0.00`;
        });
    }

})();
