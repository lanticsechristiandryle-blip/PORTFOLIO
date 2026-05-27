/* ============================================================
   main.js — CDL Portfolio | Shared JavaScript
   ============================================================

   ╔══════════════════════════════════════════════════════╗
   ║  ★  PROJECTS — EDIT HERE TO ADD / UPDATE PROJECTS  ★ ║
   ╚══════════════════════════════════════════════════════╝

   To add a new project: copy one object below and paste it
   as a new entry inside the `projects` array.

   Fields:
     title       — Project name
     description — Short summary (1–2 sentences)
     tags        — Array of tech/skills used
     link        — URL to live project or repo (use "#" as placeholder)
     image       — Path or URL to a screenshot (use "" to show placeholder)

   ============================================================ */

const projects = [
  {
    title: "CDL Checkers",
    description: "Classic checkers. Modern feel. No downloads required.",
    tags: ["HTML", "CSS", "JavaScript", "GAME", "BOARD GAME", "MINIMALIST", "DARK THEME", "MULTIPLAYER"],
    link: "https://checkers.lanticsechristiandryle.workers.dev/",
    image: "assets/checker.png"  // e.g. "assets/project-alpha.png" or a full URL
  },
  {
    title: "task.",
    description: "A minimalist task manager with a dark blue theme. Add, edit, and organize tasks with filters, due dates, and drag-and-drop reordering — all saved locally in your browser.",
    tags: ["TASK-MANAGER", "HTML", "CSS", "JavaScript", "LOCAL STORAGE", "DARK THEME", "MINIMALIST"],
    link: "https://todolist.lanticsechristiandryle.workers.dev/",
    image: "assets/todolist.png"
  },
  {
    title: "CONFESSIONAL",
    description: "An anonymous confession board where anyone can post, vote, and read confessions — no accounts, no tracking, fully ephemeral. ",
    tags: ["ANONYMOUS", "D1 DATABASE", "SERVERLESS", "HTML", "CSS", "JavaScript", "LOCAL STORAGE", "DARK THEME", "MINIMALIST", "OPEN SOURCE"],
    link: "https://bbae7146.confessional.pages.dev/",
    image: "assets/publicboard.png"
  },
  {
    title: "CALCULATOR",
    description: "A clean, dark-mode calculator with a blue minimalist design, animated background, and keyboard support. Built with vanilla HTML, CSS, and JS.",
    tags: ["CALCULATOR", "HTML", "CSS", "JavaScript", "DARK THEME", "MINIMALIST"],
    link: "https://calculator.lanticsechristiandryle.workers.dev/",
    image: "assets/calculator.png"
  }
];

/* ============================================================
   CARD RENDERER
   Builds project cards from the array above.
   Used on both index.html (featured) and projects.html (all).
   ============================================================ */

/**
 * Render project cards into a container element.
 * @param {HTMLElement} container  — The grid element to fill
 * @param {number}      limit      — Max cards to render (0 = all)
 */
function renderProjects(container, limit = 0) {
  if (!container) return;
  const list = limit > 0 ? projects.slice(0, limit) : projects;

  list.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${i * 0.08}s`;

    // Image or placeholder
    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
      : `<div class="project-img-placeholder">[ project preview ]</div>`;

    // Tags
    const tagsHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-img-wrap">${imgHTML}</div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">${tagsHTML}</div>
        <a href="${p.link}" class="project-link" target="_blank" rel="noopener">
          View Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>`;
    container.appendChild(card);
  });
}

/* ============================================================
   NAVBAR — hamburger toggle + active link
   ============================================================ */
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close when a link is tapped
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Mark active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe all .reveal and .reveal-stagger elements
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================================
   LOGO IMAGE FALLBACK
   If logo image fails to load, hide it (the text "CDL" is always shown)
   ============================================================ */
function initLogoFallback() {
  const logoImg = document.getElementById('logo-img');
  if (logoImg) {
    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
    });
  }
}

/* ============================================================
   BLINKING CURSOR on hero tagline
   ============================================================ */
function initCursor() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  tagline.appendChild(cursor);
}

/* ============================================================
   INIT — runs on every page
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initLogoFallback();
  initCursor();

  // Projects page: render all cards
  const allGrid = document.getElementById('all-projects-grid');
  if (allGrid) renderProjects(allGrid, 0);

  // Home page: render featured cards (first 3)
  const featuredGrid = document.getElementById('featured-projects-grid');
  if (featuredGrid) renderProjects(featuredGrid, 3);
});
