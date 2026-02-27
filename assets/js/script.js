const NAV_ITEMS = [
 { label: 'Accueil',         href: 'index.html',        key: 'accueil'      },
 { label: 'Nos formations',  href: 'formation.html',    key: 'formation'    },
 { label: 'Témoignages',     href: 'temoignages.html',  key: 'temoignages'  },
 { label: 'Qui sommes-nous', href: 'a-propos.html',     key: 'apropos'      },
];
const CENTRES = [
 { name: 'Synitier Paris Vaugirard',    addr: '281 Rue de Vaugirard, 75015 Paris',          lat: 48.8414, lng: 2.3007 },
 { name: 'Synitier Paris Montparnasse', addr: '163 Avenue du Maine, 75014 Paris',            lat: 48.8398, lng: 2.3222 },
 { name: 'Synitier Lyon Saxe',          addr: '43 Av. Maréchal de Saxe, 69006 Lyon',         lat: 45.7609, lng: 4.8531 },
 { name: 'Synitier Lyon Lafayette',     addr: '6 Cours Lafayette, 69003 Lyon',               lat: 45.7603, lng: 4.8376 },
 { name: 'Synitier Lille',              addr: '13 Pl. Pierre Mendès France, 59800 Lille',    lat: 50.6270, lng: 3.0574 },
 { name: 'Synitier Marseille',          addr: '31 Rue de la République, 13002 Marseille',    lat: 43.2978, lng: 5.3706 },
 { name: 'Synitier Montpellier Est',    addr: '125 Rue Alfred Sauvy, 34470 Pérols',          lat: 43.5617, lng: 3.9068 },
];
function buildNav(activePage) {
 const header = document.getElementById('site-header');
 if (!header) return;
 const linksHTML = NAV_ITEMS.map(item => {
 const isActive = item.key === activePage ? ' class="active" aria-current="page"' : '';
 return `<li><a href="${item.href}"${isActive}>${item.label}</a></li>`;
 }).join('');
 header.innerHTML = `
 <nav role="navigation" aria-label="Navigation principale">
 <div class="nav-inner">
 <a href="index.html" class="nav-logo" aria-label="Synitier - Accueil">
 <img src="assets/images/logo/logo-synitier-bleu.png" alt="Synitier" class="nav-logo-img" height="40">
 </a>
 <ul class="nav-links" id="nav-links">
 ${linksHTML}
 </ul>
 <a href="contact.html" class="btn btn-primary nav-cta">
 Nous contacter
 </a>
 <button class="menu-toggle" id="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-links">
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
 <line x1="3" y1="6"  x2="21" y2="6"/>
 <line x1="3" y1="12" x2="21" y2="12"/>
 <line x1="3" y1="18" x2="21" y2="18"/>
 </svg>
 </button>
 </div>
 </nav>
 `;
}
function buildFooter() {
 const footer = document.getElementById('site-footer');
 if (!footer) return;
 footer.innerHTML = `
 <div class="footer-main">
 <div class="container">
 <div class="footer-grid">
 <div class="footer-brand">
 <a href="index.html" aria-label="Synitier - Accueil">
 <img src="assets/images/logo/logo-synitier-blanc.png" alt="Synitier" class="footer-logo-img" height="44">
 </a>
 <p class="footer-tagline">Organisme de formation Qualiopi spécialisé<br>en mobilité légère et urbaine.</p>
 </div>
 <div class="footer-col">
 <h4>Coordonnées</h4>
 <p>281 Rue de Vaugirard<br>75015 Paris</p>
 <p><a href="tel:+33611818818">06 11 81 88 18</a></p>
 <p><a href="mailto:contact@synitier.fr">contact@synitier.fr</a></p>
 </div>
 <div class="footer-col">
 <h4>Certification</h4>
 <a href="certificat-qualiopi.html" class="qualiopi-logo" aria-label="Voir le certificat Qualiopi">
 <img src="assets/images/icones/logo-qualiopi.png" alt="Logo Qualiopi" width="130" height="52">
 </a>
 </div>
 </div>
 </div>
 </div>
 <div class="footer-bottom">
 <div class="container">
 <div class="footer-bottom-inner">
 <span>&copy; ${new Date().getFullYear()} Synitier. Tous droits réservés.</span>
 <div class="footer-legal-links">
 <a href="mentions-legales.html">Mentions légales</a>
 <a href="cgu.html">CGU</a>
 <a href="cgv.html">CGV</a>
 </div>
 </div>
 </div>
 </div>
 `;
}
function initMobileMenu() {
 const toggle = document.getElementById('menu-toggle');
 const links  = document.getElementById('nav-links');
 if (!toggle || !links) return;
 toggle.addEventListener('click', () => {
 const isOpen = links.classList.toggle('open');
 toggle.setAttribute('aria-expanded', isOpen);
 toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
 });
 links.querySelectorAll('a').forEach(a => {
 a.addEventListener('click', () => {
 links.classList.remove('open');
 toggle.setAttribute('aria-expanded', 'false');
 });
 });
 document.addEventListener('click', (e) => {
 if (!e.target.closest('#site-header')) {
 links.classList.remove('open');
 toggle.setAttribute('aria-expanded', 'false');
 }
 });
}
function initAccordion() {
 document.querySelectorAll('.accordion-btn').forEach(btn => {
 btn.addEventListener('click', () => {
 const item   = btn.closest('.accordion-item');
 const panel  = item.querySelector('.accordion-panel');
 const isOpen = item.classList.contains('open');
 const parent = item.closest('.accordion');
 if (parent) {
 parent.querySelectorAll('.accordion-item.open').forEach(openItem => {
 openItem.classList.remove('open');
 openItem.querySelector('.accordion-panel').classList.remove('open');
 openItem.querySelector('.accordion-btn').setAttribute('aria-expanded', 'false');
 });
 }
 if (!isOpen) {
   item.classList.add('open');
   panel.classList.add('open');
   btn.setAttribute('aria-expanded', 'true');
 }
 });
 btn.setAttribute('aria-expanded', 'false');
 });
}
function initFormationTabs() {
 const tabs = document.querySelectorAll('.formation-tab-btn');
 if (!tabs.length) return;
 function activateTab(key) {
 tabs.forEach(t => {
 const active = t.dataset.tab === key;
 t.classList.toggle('active', active);
 t.setAttribute('aria-selected', active);
 });
 document.querySelectorAll('.accordion-item[data-formations]').forEach(item => {
 const formations = item.dataset.formations.split(',');
 const visible = key === 'complete' || formations.includes(key);
 item.style.display = visible ? '' : 'none';
 });
 const objBlock = document.getElementById('objectifs-block');
 if (objBlock) {
 objBlock.style.display = key === 'complete' ? '' : 'none';
 }
 const bcSubtitle = document.getElementById('bc-subtitle');
 if (bcSubtitle) {
 const labels = {
 mecanique:  'Blocs de compétences : Mécanique vélos',
 electrique: 'Blocs de compétences : Vélo à assistance électrique et trottinettes électriques',
 complete:   'Blocs de compétences : Formation complète mécanique et électrique',
 };
 bcSubtitle.textContent = labels[key] || '';
 }
 }
 tabs.forEach(tab => {
 tab.addEventListener('click', () => activateTab(tab.dataset.tab));
 });
 activateTab(tabs[0].dataset.tab);
}
function initScrollAnimations() {
 const targets = document.querySelectorAll('.fade-up');
 if (!targets.length) return;
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 observer.unobserve(entry.target);
 }
 });
 }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
 targets.forEach(el => observer.observe(el));
}
function initContactForm() {
 const form    = document.getElementById('contact-form');
 const success = document.getElementById('form-success');
 if (!form) return;
 form.addEventListener('submit', (e) => {
 e.preventDefault();
 const required = form.querySelectorAll('[required]');
 let valid = true;
 required.forEach(field => {
 field.style.borderColor = '';
 if (!field.value.trim()) {
 field.style.borderColor = '#f59e0b';
 valid = false;
 }
 });
 const emailField = form.querySelector('[type="email"]');
 if (emailField && emailField.value && !emailField.value.includes('@')) {
 emailField.style.borderColor = '#f59e0b';
 valid = false;
 }
 if (!valid) {
 const firstInvalid = form.querySelector('[style*="borderColor"]');
 if (firstInvalid) firstInvalid.focus();
 return;
 }
 const submitBtn = form.querySelector('[type="submit"]');
 submitBtn.disabled = true;
 submitBtn.textContent = 'Envoi en cours...';
 setTimeout(() => {
 form.style.display = 'none';
 if (success) {
 success.classList.add('visible');
 success.scrollIntoView({ behavior: 'smooth', block: 'center' });
 }
 }, 900);
 });
 form.querySelectorAll('input, select, textarea').forEach(field => {
 field.addEventListener('input', () => { field.style.borderColor = ''; });
 });
}
function initMap() {
 const mapEl = document.getElementById('map');
 if (!mapEl) return;
 if (typeof L === 'undefined') {
 setTimeout(initMap, 200);
 return;
 }
 const map = L.map('map', {
 center: [46.5, 2.8],
 zoom: 5,
 scrollWheelZoom: false,
 zoomControl: true,
 });
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
 maxZoom: 18,
 }).addTo(map);
 const customIcon = L.divIcon({
 html: `<div style="background:#293884;width:36px;height:36px;border-radius:50%;border:3px solid white;box-shadow:0 3px 12px rgba(41,56,132,0.5);display:flex;align-items:center;justify-content:center;"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' width='20' height='20' fill='white'><path d='M5.299,144.645l69.126,25.8l26.756,86.047c1.712,5.511,8.451,7.548,12.924,3.891l38.532-31.412c4.039-3.291,9.792-3.455,14.013-0.391l69.498,50.457c4.785,3.478,11.564,0.856,12.764-4.926L299.823,29.22c1.31-6.316-4.896-11.585-10.91-9.259L5.218,129.402C-1.783,132.102-1.722,142.014,5.299,144.645z M96.869,156.711l135.098-83.207c2.428-1.491,4.926,1.792,2.841,3.726L123.313,180.87c-3.919,3.648-6.447,8.53-7.163,13.829l-3.798,28.146c-0.503,3.758-5.782,4.131-6.819,0.494l-14.607-51.325C89.253,166.16,91.691,159.907,96.869,156.711z'/></svg></div>`,
 className: '',
 iconSize:    [36, 36],
 iconAnchor:  [18, 18],
 popupAnchor: [0, -22],
 });
 CENTRES.forEach(centre => {
 L.marker([centre.lat, centre.lng], { icon: customIcon })
 .addTo(map)
 .bindPopup(`
 <div style="font-family:Nunito,sans-serif;padding:4px;min-width:190px;">
 <strong style="color:#293884;display:block;margin-bottom:5px;font-size:0.9rem;">
 ${centre.name}
 </strong>
 <span style="color:#637085;font-size:0.84rem;line-height:1.5;">
 ${centre.addr}
 </span>
 </div>
 `, { maxWidth: 250, closeButton: true });
 });
 const group = L.featureGroup(
 CENTRES.map(c => L.marker([c.lat, c.lng]))
 );
 map.fitBounds(group.getBounds().pad(0.15));
 setTimeout(() => map.invalidateSize(), 300);
}
function buildBackToTop() {
 const btn = document.createElement('button');
 btn.id = 'back-to-top';
 btn.className = 'back-to-top';
 btn.setAttribute('aria-label', 'Retour en haut de la page');
 btn.setAttribute('title', 'Retour en haut');
 btn.innerHTML = `
 <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"
 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
 <polyline points="18,15 12,9 6,15"/>
 </svg>`;
 document.body.appendChild(btn);
 let ticking = false;
 window.addEventListener('scroll', () => {
 if (!ticking) {
 requestAnimationFrame(() => {
 btn.classList.toggle('visible', window.scrollY > 450);
 ticking = false;
 });
 ticking = true;
 }
 });
 btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
function initCounters() {
 const counters = document.querySelectorAll('.chiffre-number[data-target]');
 if (!counters.length) return;
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (!entry.isIntersecting) return;
 observer.unobserve(entry.target);
 const el       = entry.target;
 const target   = parseInt(el.dataset.target, 10);
 const suffix   = el.dataset.suffix || '';
 const duration = 1600;
 const start    = performance.now();
 function update(now) {
 const progress = Math.min((now - start) / duration, 1);
 const ease     = 1 - Math.pow(1 - progress, 4);
 el.textContent = Math.round(target * ease) + suffix;
 if (progress < 1) requestAnimationFrame(update);
 }
 requestAnimationFrame(update);
 });
 }, { threshold: 0.5 });
 counters.forEach(el => observer.observe(el));
}
function initVideoModal() {
 const overlay = document.createElement('div');
 overlay.className = 'video-modal-overlay';
 overlay.setAttribute('role', 'dialog');
 overlay.setAttribute('aria-modal', 'true');
 overlay.setAttribute('aria-label', 'Lecture vidéo');
 overlay.innerHTML = `
 <div class="video-modal-inner" style="width:100%;">
 <button class="video-modal-close" aria-label="Fermer la vidéo">
 <svg viewBox="0 0 24 24" aria-hidden="true">
 <line x1="18" y1="6" x2="6" y2="18"/>
 <line x1="6" y1="6" x2="18" y2="18"/>
 </svg>
 </button>
 <div class="vimeo-ratio-wrap" style="position:relative;overflow:hidden;border-radius:10px;">
 <iframe id="vimeo-modal-iframe" frameborder="0"
  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  style="position:absolute;top:0;left:0;width:100%;height:100%;"
  title="Vidéo Synitier">
 </iframe>
 </div>
 </div>
 `;
 document.body.appendChild(overlay);
 const iframe    = overlay.querySelector('#vimeo-modal-iframe');
 const ratioWrap = overlay.querySelector('.vimeo-ratio-wrap');
 const inner     = overlay.querySelector('.video-modal-inner');
 const closeBtn  = overlay.querySelector('.video-modal-close');
 function openModal(vimeoId, ratio) {
 const isPortrait = ratio === '9/16';
 inner.style.maxWidth = isPortrait ? 'min(400px,90vw)' : 'min(860px,95vw)';
 ratioWrap.style.paddingBottom = isPortrait ? '177.78%' : '56.25%';
 iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&app_id=58479`;
 overlay.classList.add('open');
 document.body.style.overflow = 'hidden';
 closeBtn.focus();
 }
 function closeModal() {
 overlay.classList.remove('open');
 document.body.style.overflow = '';
 iframe.src = '';
 }
 closeBtn.addEventListener('click', closeModal);
 overlay.addEventListener('click', e => {
 if (!inner.contains(e.target)) closeModal();
 });
 document.addEventListener('keydown', e => {
 if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
 });
 document.querySelectorAll('.video-click-trigger[data-vimeo-id]').forEach(trigger => {
 const id    = trigger.dataset.vimeoId;
 const ratio = trigger.dataset.vimeoRatio || '16/9';
 trigger.addEventListener('click', () => openModal(id, ratio));
 trigger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(id, ratio); }
 });
 });
}
function initFormationFilters() {
 const btns  = document.querySelectorAll('.filtre-btn[data-filter]');
 const cards = document.querySelectorAll('.fcard-cat[data-tags]');
 if (!btns.length || !cards.length) return;
 function applyFilter(tag) {
  btns.forEach(b => b.classList.toggle('active', b.dataset.filter === tag));
  cards.forEach(card => {
   if (tag === 'all') {
    card.hidden = false;
   } else {
    const tags = card.dataset.tags.split(',');
    card.hidden = !tags.includes(tag);
   }
  });
 }
 btns.forEach(btn => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
 });
 applyFilter('all');
}
function initProgrammePdf() {
 const btn = document.getElementById('programme-toggle-btn');
 if (!btn) return;
 btn.addEventListener('click', e => {
  e.preventDefault();
  const panel   = document.getElementById('programme-pdf-panel');
  const isOpen  = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !isOpen);
  const chevron = btn.querySelector('.study-chevron');
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
   const iframe = panel.querySelector('iframe[data-src]');
   if (iframe) { iframe.src = iframe.dataset.src; iframe.removeAttribute('data-src'); }
   setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
 });
}
function initStudyPdf() {
 const btn = document.getElementById('etude-toggle-btn');
 if (!btn) return;
 btn.addEventListener('click', e => {
  e.preventDefault();
  const panel   = document.getElementById('etude-pdf-panel');
  const isOpen  = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !isOpen);
  const chevron = btn.querySelector('.study-chevron');
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) {
   const iframe = panel.querySelector('iframe[data-src]');
   if (iframe) { iframe.src = iframe.dataset.src; iframe.removeAttribute('data-src'); }
   setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
 });
}
function initHeroNav() {
 if (!document.body.classList.contains('has-video-hero')) return;
 const header = document.getElementById('site-header');
 const hero   = document.querySelector('.hero');
 if (!header || !hero) return;
 function update() {
  header.classList.toggle('nav-solid', window.scrollY > hero.offsetHeight * 0.75);
 }
 window.addEventListener('scroll', update, { passive: true });
 update();
}
document.addEventListener('DOMContentLoaded', () => {
 const page = document.body.dataset.page || 'accueil';
 buildNav(page);
 buildFooter();
 initMobileMenu();
 initAccordion();
 initScrollAnimations();
 initCounters();
 initVideoModal();
 initHeroNav();
 buildBackToTop();
 if (document.getElementById('contact-form'))  initContactForm();
 if (document.getElementById('map'))           initMap();
 if (document.querySelector('.formation-tab-btn')) initFormationTabs();
 if (document.querySelector('.filtre-btn[data-filter]')) initFormationFilters();
 initStudyPdf();
 initProgrammePdf();
});