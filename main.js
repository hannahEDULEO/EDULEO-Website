// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Contact form – Formspree
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Wird gesendet…';
  btn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/maqzyzlk', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
    } else {
      btn.textContent = 'Nachricht senden ✉️';
      btn.disabled = false;
      alert('Es gab einen Fehler. Bitte schreib uns direkt an kontakt@eduleo.de');
    }
  } catch {
    btn.textContent = 'Nachricht senden ✉️';
    btn.disabled = false;
    alert('Es gab einen Fehler. Bitte schreib uns direkt an kontakt@eduleo.de');
  }
});

// Scroll animations (fade-in, slide-left, slide-right, slide-up)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up')
  .forEach(el => observer.observe(el));

// TOC active highlight on scroll
const tocLinks = document.querySelectorAll('.sidebar-toc-link');
if (tocLinks.length) {
  const headings = [...tocLinks].map(l => document.querySelector(l.getAttribute('href')));
  window.addEventListener('scroll', () => {
    let active = 0;
    headings.forEach((h, i) => { if (h && h.getBoundingClientRect().top < 120) active = i; });
    tocLinks.forEach((l, i) => l.classList.toggle('toc-active', i === active));
  }, { passive: true });
}

// Count-up animation for 200+
const counterEl = document.getElementById('count-familien');
if (counterEl) {
  const target = 200;
  const duration = 1800;
  let started = false;

  const countObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counterEl.textContent = Math.floor(eased * target) + '+';
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(counterEl);
    }
  }, { threshold: 0.5 });

  countObserver.observe(counterEl);
}
