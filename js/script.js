// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ===== Back to top button =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll reveal animation =====
const revealTargets = document.querySelectorAll(
  '.skill-card, .timeline-item, .project-card, .cert-card, .edu-card, .stat'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ===== Section title underline draw-in =====
const titleTargets = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
titleTargets.forEach(el => titleObserver.observe(el));

// ===== Scroll progress bar =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
});

// ===== Stat count-up animation =====
const statNums = document.querySelectorAll('.stat-num[data-count]');
const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-count'), 10) || 0;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1200;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
};
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ===== Hero code-editor mouse tilt (desktop only) =====
const heroVisual = document.getElementById('heroVisual');
const editorWindow = heroVisual?.querySelector('.editor-window');
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroVisual && editorWindow && !isTouchDevice && !prefersReducedMotion) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 14;
    const rotateX = -y * 10;
    editorWindow.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(0)`;
    editorWindow.style.animation = 'none';
  });
  heroVisual.addEventListener('mouseleave', () => {
    editorWindow.style.transform = '';
    editorWindow.style.animation = '';
  });
}

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Contact form (front-end only placeholder) =====
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('This form is UI-ready. Connect it to Formspree, EmailJS, or your own backend to start receiving messages.');
});
