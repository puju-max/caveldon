// Small, dependency-free interactions for the CAVELDON site. Classic script (not a module) so it also
// works when pages are opened straight from disk.
(() => {
'use strict';

// Analytics events. Works with Plausible or Umami if loaded (see Analytics.astro); does nothing otherwise.
// Each event records where it happened: the page and the nearest section id (e.g. "hero-title", "how", "faq").
function track(name, props = {}) {
  try {
    if (typeof window.plausible === 'function') window.plausible(name, { props });
    else if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, props);
  } catch { /* analytics must never break the page */ }
}
window.cvTrack = track;
document.addEventListener('click', event => {
  const el = event.target instanceof Element ? event.target.closest('[data-track]') : null;
  if (!el) return;
  const section = el.closest('section[id], section[aria-labelledby], header, nav');
  const where = section?.id || section?.getAttribute('aria-labelledby') || section?.tagName.toLowerCase() || 'page';
  track(el.getAttribute('data-track'), { page: location.pathname, location: where });
});

// Mobile menu
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function setMenu(open) {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !open;
}
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
window.matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

// Insights topic filters
const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const active = button.dataset.filter;
  filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = active !== 'all' && card.dataset.category !== active;
  });
}));

// Framework explorer (security & compliance page). Illustrative engineering notes, not compliance advice.
const frameworks = {
  soc: { title: 'SOC 2', description: 'SOC 2 reports look at how a service organisation controls security (and optionally availability, confidentiality and privacy) over a defined scope and period. Many US enterprise buyers ask for one.', points: ['Who owns each cloud control', 'Access and change evidence', 'Monitoring and incident records'], note: 'Only an independent CPA firm issues a SOC 2 report. We help prepare the technical controls and evidence.' },
  iso: { title: 'ISO/IEC 27001', description: 'An information security management system covers organisational risk and continuous improvement, not just cloud settings. Common with UK and EU customers.', points: ['Technical control implementation', 'Risk treatment and ownership', 'Documented evidence and review'], note: 'Certification is a separate assessment by an accredited certification body.' },
  gdpr: { title: 'GDPR', description: 'For processing personal data of people in the EU/UK, technical and organisational measures, data flows and international transfers all need attention.', points: ['Data-flow and processing map', 'Access, encryption and resilience', 'Transfers, suppliers and retention'], note: 'GDPR does not generally require EU-only hosting for all personal data; transfer rules must be assessed case by case.' },
  hipaa: { title: 'HIPAA', description: 'For in-scope US healthcare organisations and their business associates, the HIPAA Security Rule sets safeguards for electronic protected health information.', points: ['Access and audit controls', 'Risk analysis and procedures', 'Transmission and data safeguards'], note: 'Engineering support complements, but does not replace, organisational, contractual and legal obligations.' },
  dora: { title: 'DORA', description: 'For covered EU financial entities, DORA addresses ICT risk, resilience testing, incident processes and third-party risk.', points: ['ICT risk and recovery controls', 'Incident records and resilience tests', 'Third-party dependencies'], note: 'Requirements depend on the organisation and its activities; specialist regulatory review is essential.' },
  pci: { title: 'PCI DSS', description: 'PCI DSS sets security requirements for systems that store, process or transmit payment-card data, within a defined scope.', points: ['Card-data environment scope', 'Segmentation, access and hardening', 'Logging, scanning and evidence'], note: 'Validation duties depend on your merchant or service-provider level.' },
};
const fxButtons = [...document.querySelectorAll('[data-framework]')];
const fx = id => document.getElementById(id);
if (fxButtons.length && fx('fx-title')) {
  fxButtons.forEach((button, index) => button.addEventListener('click', () => {
    const data = frameworks[button.dataset.framework];
    if (!data) return;
    fxButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    fx('fx-title').textContent = data.title;
    fx('fx-desc').textContent = data.description;
    fx('fx-note').textContent = data.note;
    fx('fx-index').textContent = `${String(index + 1).padStart(2, '0')} / ${String(fxButtons.length).padStart(2, '0')}`;
    fx('fx-points').replaceChildren(...data.points.map(text => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = text;
      return chip;
    }));
  }));
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
})();
