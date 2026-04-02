/* ============================================================
   BRIGHTURE GLOBAL — SHARED JAVASCRIPT
   Performance: lazy-load reveals, nav scroll, mobile menu
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal (IntersectionObserver) ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Nav Scroll Shadow ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Mobile Nav Toggle ── */
  window.toggleMobileNav = function () {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.getElementById('hamburger');
    if (mobileNav) {
      mobileNav.classList.toggle('open');
      if (hamburger) {
        const isOpen = mobileNav.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
      }
    }
  };

  /* ── Comparison Table Tabs ── */
  window.showTab = function (name) {
    document.querySelectorAll('.comp-pane').forEach((p) => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    const pane = document.getElementById('tab-' + name);
    if (pane) pane.classList.add('active');
    const btn = document.querySelector('[data-tab="' + name + '"]');
    if (btn) btn.classList.add('active');
  };

  /* ── Contact Form Submit ── */
  window.submitForm = function () {
    const required = ['f-name', 'f-email', 'f-message'];
    let valid = true;
    required.forEach((id) => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) {
        el.style.borderColor = '#ef4444';
        valid = false;
        el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;
    const formArea = document.getElementById('formArea');
    const formSuccess = document.getElementById('formSuccess');
    if (formArea && formSuccess) {
      formArea.style.display = 'none';
      formSuccess.style.display = 'block';
    }
  };

  /* ── Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Lazy Load Images ── */
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach((img) => imgObserver.observe(img));
  }

})();
