// ===== SHUTTER KUWAIT - MAIN JS =====
document.addEventListener('DOMContentLoaded', function() {

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() { preloader.classList.add('hidden'); }, 800);
        });
        // Fallback
        setTimeout(function() { preloader.classList.add('hidden'); }, 3000);
    }

    // Header scroll effect
    const header = document.getElementById('header');
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        navLinks.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        var scrollY = window.scrollY + 200;
        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // Counter animation
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'));
        if (!target) return;
        var duration = 2000;
        var start = 0;
        var startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + '+';
        }
        requestAnimationFrame(step);
    }

    // Scroll reveal animation
    var animatedElements = document.querySelectorAll('[data-animate]');
    var counterElements = document.querySelectorAll('[data-count]');
    var countersAnimated = false;

    function checkVisibility() {
        var windowHeight = window.innerHeight;
        animatedElements.forEach(function(el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.classList.add('animated');
            }
        });
        if (!countersAnimated) {
            counterElements.forEach(function(el) {
                var rect = el.getBoundingClientRect();
                if (rect.top < windowHeight - 50) {
                    animateCounter(el);
                    countersAnimated = true;
                }
            });
        }
    }
    window.addEventListener('scroll', checkVisibility);
    setTimeout(checkVisibility, 100);

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.closest('.faq-item');
            var answer = item.querySelector('.faq-answer');
            var isActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item').forEach(function(faq) {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            // Open clicked
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var headerH = header ? header.offsetHeight : 0;
                var top = targetEl.offsetTop - headerH - 10;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

});
