/* =========================================================
   Vajeda Multani — Portfolio
   Modular vanilla JavaScript (ES6+)
   ========================================================= */
'use strict';

/* ---------- Small helpers ---------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   1. Loading screen
   ========================================================= */
const initLoader = () => {
  const loader = $('#loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
  // Safety fallback
  setTimeout(() => loader.classList.add('hidden'), 3500);
};

/* =========================================================
   2. Theme toggle (persisted in localStorage)
   ========================================================= */
const initTheme = () => {
  const root = document.documentElement;
  const toggle = $('#themeToggle');
  const stored = localStorage.getItem('theme');
  // Dark-first: only use light when the user explicitly chose it before.
  root.setAttribute('data-theme', stored === 'light' ? 'light' : 'dark');

  toggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
};

/* =========================================================
   3. Navigation: scroll style, mobile menu, active link
   ========================================================= */
const initNav = () => {
  const nav = $('#nav');
  const menu = $('#navMenu');
  const hamburger = $('#hamburger');
  const links = $$('.nav__link');

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  };

  hamburger?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  links.forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // Active section indicator via IntersectionObserver
  const sections = $$('section[id]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
};

/* =========================================================
   4. Scroll progress bar
   ========================================================= */
const initScrollProgress = () => {
  const bar = $('#scrollProgress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
};

/* =========================================================
   5. Typing animation
   ========================================================= */
const initTyping = () => {
  const el = $('#typing');
  if (!el) return;
  const words = ['PHP Developer', 'WordPress Developer', 'CodeIgniter Developer', 'Full Stack Web Developer', 'Python Enthusiast'];
  let w = 0, c = 0, deleting = false;

  const tick = () => {
    const current = words[w];
    el.textContent = current.slice(0, c);
    if (!deleting && c < current.length) { c++; }
    else if (deleting && c > 0) { c--; }
    else if (!deleting && c === current.length) { deleting = true; return setTimeout(tick, 1600); }
    else { deleting = false; w = (w + 1) % words.length; }
    setTimeout(tick, deleting ? 45 : 95);
  };
  tick();
};

/* =========================================================
   6. Scroll reveal
   ========================================================= */
const initReveal = () => {
  const items = $$('.reveal');
  if (prefersReduced) { items.forEach(i => i.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
};

/* =========================================================
   7. Animated skill bars
   ========================================================= */
const initSkillBars = () => {
  const bars = $$('.bar');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = $('.bar__fill', e.target);
        fill.style.width = `${e.target.dataset.level}%`;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
};

/* =========================================================
   8. Animated counters
   ========================================================= */
const initCounters = () => {
  const nums = $$('.stat__num');
  const animate = el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const dur = 1800;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
};

/* =========================================================
   9. Custom cursor + mouse glow (desktop only)
   ========================================================= */
const initCursor = () => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine) return;
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  const glow = $('#mouseGlow');
  let rx = 0, ry = 0, mx = 0, my = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    glow.style.opacity = '1';
  });

  const loop = () => {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  };
  loop();

  $$('a, button, .tilt, .badge, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
};

/* =========================================================
   10. Floating particles (lightweight)
   ========================================================= */
const initParticles = () => {
  const box = $('#particles');
  if (!box || prefersReduced) return;
  const count = window.innerWidth < 768 ? 14 : 28;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 3 + 2;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${-Math.random() * 20}%`;
    p.style.width = p.style.height = `${size}px`;
    p.style.animationDuration = `${Math.random() * 18 + 12}s`;
    p.style.animationDelay = `${Math.random() * -20}s`;
    frag.appendChild(p);
  }
  box.appendChild(frag);
};

/* =========================================================
   11. Mouse parallax on hero visual
   ========================================================= */
const initParallax = () => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine || prefersReduced) return;
  const targets = $$('[data-parallax]');
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    targets.forEach(t => { t.style.transform = `translate(${x * 14}px, ${y * 14}px)`; });
  });
};

/* =========================================================
   12. Card tilt effect
   ========================================================= */
const initTilt = () => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!fine || prefersReduced) return;
  $$('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
};

/* =========================================================
   13. Button ripple
   ========================================================= */
const initRipple = () => {
  $$('.ripple').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      const size = Math.max(r.width, r.height);
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - r.left - size / 2}px`;
      wave.style.top = `${e.clientY - r.top - size / 2}px`;
      btn.appendChild(wave);
      setTimeout(() => wave.remove(), 600);
    });
  });
};

/* =========================================================
   14. Back to top
   ========================================================= */
const initBackToTop = () => {
  const btn = $('#backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/* =========================================================
   15. Contact form validation
   ========================================================= */
const initContactForm = () => {
  const form = $('#contactForm');
  if (!form) return;
  const status = $('#formStatus');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (name, msg) => {
    const field = form.querySelector(`[name="${name}"]`).closest('.field');
    const err = form.querySelector(`.field__error[data-for="${name}"]`);
    field.classList.toggle('invalid', !!msg);
    err.textContent = msg || '';
  };

  const validate = () => {
    let ok = true;
    const data = Object.fromEntries(new FormData(form));
    if (!data.name.trim()) { setError('name', 'Please enter your name.'); ok = false; } else setError('name', '');
    if (!emailRe.test(data.email.trim())) { setError('email', 'Enter a valid email address.'); ok = false; } else setError('email', '');
    if (!data.subject.trim()) { setError('subject', 'Please add a subject.'); ok = false; } else setError('subject', '');
    if (data.message.trim().length < 10) { setError('message', 'Message should be at least 10 characters.'); ok = false; } else setError('message', '');
    return ok;
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    if (!validate()) { status.classList.add('error'); status.textContent = 'Please fix the errors above.'; return; }
    // No backend — simulate success. Replace with a real endpoint / mailto integration.
    status.classList.add('success');
    status.textContent = 'Thanks! Your message has been prepared. I will get back to you soon.';
    form.reset();
  });

  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      if (el.closest('.field').classList.contains('invalid')) validate();
    });
  });
};

/* =========================================================
   16. Footer year
   ========================================================= */
const initYear = () => { const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); };

/* =========================================================
   Init everything
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initNav();
  initScrollProgress();
  initTyping();
  initReveal();
  initSkillBars();
  initCounters();
  initCursor();
  initParticles();
  initParallax();
  initTilt();
  initRipple();
  initBackToTop();
  initContactForm();
  initYear();
});
