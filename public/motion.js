// CAVELDON · motion engine
// ------------------------------------------------------------------
// Scroll-triggered reveal, text plotted in like a drawing, diagrams that
// draw their own lines. Dependency-free, classic script so it also works
// when a page is opened straight from disk.
//
// Rules the engine follows:
//   1. Content is never hidden from a visitor who has JS but no motion.
//   2. Nothing animates twice.
//   3. Reduced-motion is respected in CSS *and* here (we don't even try).
//   4. If this file never runs, the inline <head> fallback unhides everything.

(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Signal that motion is live, and cancel the inline safety fallback.
  root.classList.add('js');
  if (window.__cvMotionFallback) {
    clearTimeout(window.__cvMotionFallback);
    window.__cvMotionFallback = null;
  }

  if (reduced) {
    // No animation at all. Make sure everything is simply present.
    document.querySelectorAll('[data-reveal], [data-words]').forEach(el => el.classList.add('is-revealed'));
    document.querySelectorAll('.diag').forEach(el => el.classList.add('is-drawn'));
    document.querySelectorAll('.section').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  /* --------------------- text splitting --------------------- */

  // Split a heading into per-word masks so each word can ride up on its own.
  // Uses <span class="w"><span class="wi">word</span></span> plus a real text
  // space between words, so screen readers and copy-paste still work.
  function splitWords(el) {
    if (el.dataset.wordsDone) return;
    const html = el.innerHTML;
    if (!html.trim() || el.querySelector('.w')) { el.dataset.wordsDone = '1'; return; }

    // Protect inline elements (code, em, strong, a, br) by walking nodes.
    const walk = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        const parts = node.textContent.split(/(\s+)/);
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            continue;
          }
          const w = document.createElement('span');
          w.className = 'w';
          const wi = document.createElement('span');
          wi.className = 'wi';
          wi.textContent = part;
          w.appendChild(wi);
          frag.appendChild(w);
        }
        return frag;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return node;
      const clone = node.cloneNode(false);
      for (const child of [...node.childNodes]) clone.appendChild(walk(child));
      return clone;
    };

    const frag = document.createDocumentFragment();
    for (const child of [...el.childNodes]) frag.appendChild(walk(child));
    el.replaceChildren(frag);
    el.dataset.wordsDone = '1';
  }

  function prepareWords() {
    document.querySelectorAll('[data-words]').forEach(el => {
      splitWords(el);
      const words = el.querySelectorAll('.w');
      words.forEach((w, i) => w.style.setProperty('--word-delay', `${i * 45}ms`));
    });
  }

  /* --------------------- diagrams --------------------- */

  function prepareDiagrams() {
    document.querySelectorAll('.diag').forEach(diag => {
      const strokes = diag.querySelectorAll('path.ln, path.acc, path.acc-dash, path.dash, path.group');
      strokes.forEach((p, i) => {
        let len = 1200;
        try { len = p.getTotalLength() || 1200; } catch { /* not measurable */ }
        p.style.setProperty('--len', Math.ceil(len));
        p.style.setProperty('--draw-delay', `${i * 70}ms`);
        p.style.setProperty('--fill-delay', `${400 + i * 60}ms`);
      });
    });
  }

  /* --------------------- observation --------------------- */

  function reveal(el) {
    if (el.dataset.revealed) return;
    el.dataset.revealed = '1';
    el.classList.add('is-revealed');
  }

  function draw(el) {
    if (el.dataset.drawn) return;
    el.dataset.drawn = '1';
    el.classList.add('is-drawn');
  }

  function start() {
    prepareWords();
    prepareDiagrams();

    // Sections: reveal the whole block plus its crosshair marks.
    const sections = document.querySelectorAll('.section, .service-overview-hero');

    // Elements that animate as a block.
    const blocks = document.querySelectorAll([
      '.sec-head',
      '.pain',
      '.svc',
      '.step',
      '.row',
      '.study-card',
      '.post',
      '.finding',
      '.owner-note',
      '.aside-note',
      '.evidence-note',
      '.callout',
      '.numbered li',
      '.decision',
      '.principles > div',
      '.report',
      '.founder',
      '.split > div',
      '.split-3 > div',
      '.migration-stages > li',
      '.practice-card',
      '.timeline li',
      '.ctl-row',
      '.faq details',
      '.answer-box',
      '.split',
      '.fx',
      '.filters',
      '.crumbs',
    ].join(','));

    // Headings get the word treatment, unless a block ancestor already animates.
    const headings = document.querySelectorAll('h1, h2');

    const isInsideBlock = el => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        if (p.hasAttribute('data-reveal')) return true;
        p = p.parentElement;
      }
      return false;
    };

    // Give blocks a small stagger within their own group.
    const groupCount = new Map();
    const groupIndex = new Map();
    blocks.forEach(el => {
      const key = el.parentElement || document.body;
      const n = groupCount.get(key) || 0;
      groupCount.set(key, n + 1);
      groupIndex.set(el, n);
    });

    const reduceTargets = new Set();
    blocks.forEach(el => {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', `${Math.min(groupIndex.get(el) * 70, 280)}ms`);
      reduceTargets.add(el);
    });

    headings.forEach(el => {
      if (isInsideBlock(el)) return;
      el.setAttribute('data-words', '');
    });

    // Anything explicitly marked gets the word treatment regardless.
    document.querySelectorAll('[data-words]').forEach(el => {
      if (el.matches('h1, h2')) return;
      el.setAttribute('data-words', '');
    });

    if (!('IntersectionObserver' in window)) {
      reduceTargets.forEach(reveal);
      document.querySelectorAll('[data-words]').forEach(reveal);
      document.querySelectorAll('.diag').forEach(draw);
      sections.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        io.unobserve(el);
        if (el.matches('.diag')) draw(el);
        else if (el.classList.contains('section') || el.classList.contains('service-overview-hero')) reveal(el);
        else reveal(el);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    reduceTargets.forEach(el => io.observe(el));
    document.querySelectorAll('[data-words]').forEach(el => io.observe(el));
    document.querySelectorAll('.diag').forEach(el => io.observe(el));
    sections.forEach(el => io.observe(el));

    // Hero content is above the fold: show it immediately, no scroll needed.
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero [data-reveal], .hero [data-words]').forEach(el => {
        io.unobserve(el);
        reveal(el);
      });
      document.querySelectorAll('.hero .diag').forEach(el => {
        io.unobserve(el);
        draw(el);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
