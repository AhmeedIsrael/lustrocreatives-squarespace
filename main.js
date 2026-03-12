/* ============================================================
   LUSTRO CREATIVES — Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Page Load ──
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    });

    // ── Nav Scroll Effect ──
    const nav = document.querySelector('.nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── Active Nav Link ──
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFile || (currentFile === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ── Mobile Nav ──
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-nav-close');

    if (hamburger && mobileNav) {
        const openMenu = () => {
            mobileNav.classList.add('open');
            hamburger.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        const closeMenu = () => {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        };
        hamburger.addEventListener('click', openMenu);
        if (mobileClose) mobileClose.addEventListener('click', closeMenu);
        mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    }

    // ── Scroll Reveal ──
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    // ── FAQ Accordion ──
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            // Close all other FAQ items in the same list
            item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            // Toggle the clicked one
            if (!isActive) item.classList.add('active');
        });
    });

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Contact Form ──
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = '✓ Message Sent';
            btn.disabled = true;
            btn.style.background = '#00C9A7';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.textContent = orig;
                btn.disabled = false;
                btn.style.background = '';
                btn.style.color = '';
                form.reset();
            }, 3500);
        });
    }

    // ── Duplicate Marquee for seamless loop ──
    const track = document.querySelector('.marquee-track');
    if (track) {
        track.innerHTML += track.innerHTML;
    }

});
