// Dynamic Year Update Script
(function() {
    'use strict';

    // Get current year
    const currentYear = new Date().getFullYear();

    // Update all elements with data-dynamic-year attribute
    document.addEventListener('DOMContentLoaded', function() {
        // Update footer copyright
        const footerTexts = document.querySelectorAll('.footer-bottom p');
        footerTexts.forEach(function(el) {
            el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, '© ' + currentYear);
        });

        // Update any element with year placeholder
        const yearElements = document.querySelectorAll('[data-year]');
        yearElements.forEach(function(el) {
            el.textContent = currentYear;
        });

        // Update hero badge if it contains year
        const heroBadge = document.querySelector('.hero-badge');
        if (heroBadge) {
            heroBadge.innerHTML = heroBadge.innerHTML.replace(/\d{4}/, currentYear);
        }

        // Update AutoCAD version references (keep as is since it's a product version)
        // AutoCAD 2025 is a specific version, not the current year
        
        // Log for debugging
        console.log('📅 Dynamic year updated to: ' + currentYear);
    });

    // Also run immediately for elements already in DOM
    const currentYearValue = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(function(el) {
        if (el.textContent.includes('©')) {
            el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, '© ' + currentYearValue);
        }
    });

})();
