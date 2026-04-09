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
 <img src="assets/images/logo/logo-synitier-bleu.webp" alt="Synitier" class="nav-logo-img" width="400" height="142">
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
 <img src="assets/images/logo/logo-synitier-blanc.webp" alt="Synitier" class="footer-logo-img" width="146" height="52">
 </a>
 <p class="footer-tagline">Organisme de formation Qualiopi spécialisé<br>en mobilité légère et urbaine.</p>
 </div>
 <div class="footer-col">
 <h4>Coordonnées</h4>
 <p style="margin:0;line-height:1.6">281 Rue de Vaugirard<br>75015 Paris<br><a href="tel:+33611818818">06 11 81 88 18</a><br><a href="mailto:contact@synitier.fr">contact@synitier.fr</a></p>
 </div>
 <div class="footer-col">
 <h4>Certification</h4>
 <a href="certificat-qualiopi.html" class="qualiopi-logo" aria-label="Voir le certificat Qualiopi">
 <img src="assets/images/icones/logo-qualiopi.webp" alt="Logo Qualiopi" width="260" height="157">
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
 document.body.style.overflow = isOpen ? 'hidden' : '';
 });
 links.querySelectorAll('a').forEach(a => {
 a.addEventListener('click', () => {
 links.classList.remove('open');
 toggle.setAttribute('aria-expanded', 'false');
 document.body.style.overflow = '';
 });
 });
 document.addEventListener('click', (e) => {
 if (!e.target.closest('#site-header')) {
 links.classList.remove('open');
 toggle.setAttribute('aria-expanded', 'false');
 document.body.style.overflow = '';
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

 /* 1. Remember where the clicked item sits on screen */
 const yBefore = item.getBoundingClientRect().top;

 /* 2. Close other open items INSTANTLY (no transition) */
 if (parent) {
  parent.querySelectorAll('.accordion-item.open').forEach(openItem => {
   if (openItem === item) return;
   const p = openItem.querySelector('.accordion-panel');
   p.style.transition = 'none';
   openItem.classList.remove('open');
   p.classList.remove('open');
   openItem.querySelector('.accordion-btn').setAttribute('aria-expanded', 'false');
   void p.offsetHeight;          /* force reflow */
   p.style.transition = '';      /* restore transition for future use */
  });
 }

 /* 3. Correct scroll so the clicked item stays in place */
 const yAfter = item.getBoundingClientRect().top;
 if (Math.abs(yAfter - yBefore) > 1) {
  window.scrollBy(0, yAfter - yBefore);
 }

 /* 4. Toggle the clicked item (with normal transition) */
 if (isOpen) {
  item.classList.remove('open');
  panel.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
 } else {
  item.classList.add('open');
  panel.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
 }

 /* 5. If the item ended up behind the fixed header, scroll to show it */
 requestAnimationFrame(() => {
  const header = document.getElementById('site-header');
  const headerH = header ? header.offsetHeight : 0;
  const rect = item.getBoundingClientRect();
  if (rect.top < headerH) {
   window.scrollTo({ top: window.scrollY + rect.top - headerH - 16, behavior: 'smooth' });
  }
 });

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
 const form = document.getElementById('contact-form');
 const success = document.getElementById('form-success');
 if (!form) return;

 // Validation patterns
 var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
 var phoneRegex = /^(?:(?:\+33|0033|0)\s?[1-9])(?:[\s.\-]?\d{2}){4}$/;
 var cpRegex = /^\d{5}$/;

 function showError(field, msg) {
  field.style.borderColor = '#ef4444';
  var errEl = field.parentElement.querySelector('.field-error');
  if (!errEl) {
   errEl = document.createElement('span');
   errEl.className = 'field-error';
   errEl.setAttribute('role', 'alert');
   errEl.style.cssText = 'color:#ef4444;font-size:0.85rem;font-weight:600;margin-top:0.25rem;display:block;';
   field.parentElement.appendChild(errEl);
  }
  errEl.textContent = msg;
 }

 function clearError(field) {
  field.style.borderColor = '';
  var errEl = field.parentElement.querySelector('.field-error');
  if (errEl) errEl.remove();
 }

 form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Honeypot check — if filled, fake success silently
  var honeypot = form.querySelector('#website');
  if (honeypot && honeypot.value) {
   var btn = form.querySelector('[type="submit"]');
   btn.disabled = true;
   btn.textContent = 'Envoi en cours\u2026';
   setTimeout(function() {
    form.style.display = 'none';
    if (success) {
     success.classList.add('visible');
     success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
   }, 900);
   return;
  }

  // Clear all previous errors
  form.querySelectorAll('input, select, textarea').forEach(clearError);

  var valid = true;

  // Required fields
  form.querySelectorAll('[required]').forEach(function(field) {
   if (field.type === 'checkbox') {
    if (!field.checked) {
     showError(field, 'Veuillez accepter pour continuer.');
     valid = false;
    }
   } else if (!field.value.trim()) {
    showError(field, 'Ce champ est obligatoire.');
    valid = false;
   }
  });

  // Email format
  var emailField = form.querySelector('[type="email"]');
  if (emailField && emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
   showError(emailField, 'Adresse email invalide.');
   valid = false;
  }

  // Phone format
  var phoneField = form.querySelector('#telephone');
  if (phoneField && phoneField.value.trim()) {
   var cleanPhone = phoneField.value.trim().replace(/\s+/g, ' ');
   if (!phoneRegex.test(cleanPhone)) {
    showError(phoneField, 'Numéro de téléphone invalide.');
    valid = false;
   }
  }

  // Postal code format
  var cpField = form.querySelector('#code-postal');
  if (cpField && cpField.value.trim() && !cpRegex.test(cpField.value.trim())) {
   showError(cpField, 'Code postal invalide (5 chiffres).');
   valid = false;
  }

  // Max length protection
  form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(function(f) {
   if (f.value.length > 1000) {
    showError(f, 'Texte trop long.');
    valid = false;
   }
  });

  if (!valid) {
   var firstErr = form.querySelector('.field-error');
   if (firstErr) {
    var field = firstErr.parentElement.querySelector('input, select, textarea');
    if (field) field.focus();
   }
   return;
  }

  // Success — submit to HubSpot
  var submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours\u2026';

  var villeField = form.querySelector('#ville-auto');
  var hsFields = [
   { objectTypeId: '0-1', name: 'firstname', value: form.querySelector('#prenom').value.trim() },
   { objectTypeId: '0-1', name: 'lastname', value: form.querySelector('#nom').value.trim() },
   { objectTypeId: '0-1', name: 'phone', value: form.querySelector('#telephone').value.trim() },
   { objectTypeId: '0-1', name: 'email', value: form.querySelector('#email').value.trim() },
   { objectTypeId: '0-1', name: 'situation_professionnelle', value: form.querySelector('#situation').selectedOptions[0].textContent },
   { objectTypeId: '0-1', name: 'zip', value: form.querySelector('#code-postal').value.trim() },
   { objectTypeId: '0-1', name: 'city', value: villeField ? villeField.value : '' },
   { objectTypeId: '0-1', name: 'commentaire_situation_projet', value: (form.querySelector('#message').value || '').trim() }
  ];

  var hsPayload = {
   fields: hsFields,
   context: {
    pageUri: window.location.href,
    pageName: document.title
   },
   legalConsentOptions: {
    consent: {
     consentToProcess: true,
     text: "J'accepte que mes données soient utilisées pour traiter ma demande."
    }
   }
  };

  fetch('https://api.hsforms.com/submissions/v3/integration/submit/146772367/45457148-44e4-4c55-9ba7-f24927924f5f', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(hsPayload)
  }).then(function() {
   form.style.display = 'none';
   if (success) {
    success.classList.add('visible');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
   }
  }).catch(function() {
   form.style.display = 'none';
   if (success) {
    success.classList.add('visible');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
   }
  });
 });

 // Clear errors on input
 form.querySelectorAll('input, select, textarea').forEach(function(field) {
  field.addEventListener('input', function() { clearError(field); });
 });

 // RGPD row visual toggle
 var rgpdCheck = form.querySelector('#rgpd-consent');
 var rgpdRow = form.querySelector('#rgpd-row');
 if (rgpdCheck && rgpdRow) {
  rgpdCheck.addEventListener('change', function() {
   rgpdRow.classList.toggle('checked', rgpdCheck.checked);
  });
 }
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
 /* Pause all testimonial Vimeo iframes before opening the modal */
 document.querySelectorAll('iframe[src*="vimeo.com"]').forEach(function(el) {
  if (el.id !== 'vimeo-modal-iframe') {
   try { el.contentWindow.postMessage('{"method":"pause"}', '*'); } catch(e) {}
  }
 });
 const isPortrait = ratio === '9/16';
 inner.style.maxWidth = isPortrait ? 'min(400px,90vw)' : 'min(860px,95vw)';
 ratioWrap.style.paddingBottom = isPortrait ? '177.78%' : '56.25%';
 iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=0&title=0&byline=0&portrait=0&badge=0&app_id=58479`;
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
function initFormationCardClick() {
 // Desktop only : toute la carte devient cliquable (pointeur fin, écran large)
 const mql = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
 const cards = document.querySelectorAll('.fcard-cat');
 if (!cards.length) return;
 cards.forEach(card => {
  const link = card.querySelector('a.btn[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  const target = link.getAttribute('target');
  function apply(on) {
   if (on) {
    card.classList.add('fcard-cat--clickable');
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.setAttribute('data-href', href);
   } else {
    card.classList.remove('fcard-cat--clickable');
    card.removeAttribute('tabindex');
    card.removeAttribute('role');
    card.removeAttribute('data-href');
   }
  }
  apply(mql.matches);
  mql.addEventListener('change', e => apply(e.matches));
  card.addEventListener('click', e => {
   if (!card.classList.contains('fcard-cat--clickable')) return;
   // Ignore si l'utilisateur clique sur un lien/bouton réel (laisse le comportement natif)
   if (e.target.closest('a, button')) return;
   // Ignore si sélection de texte
   const sel = window.getSelection && window.getSelection().toString();
   if (sel && sel.length) return;
   if (target === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey) {
    window.open(href, '_blank', 'noopener');
   } else {
    window.location.href = href;
   }
  });
  card.addEventListener('keydown', e => {
   if (!card.classList.contains('fcard-cat--clickable')) return;
   if (e.target !== card) return;
   if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    window.location.href = href;
   }
  });
 });
}
function initTogglePanel(btnId, panelId) {
 const btn = document.getElementById(btnId);
 if (!btn) return;
 btn.addEventListener('click', e => {
  e.preventDefault();
  const panel   = document.getElementById(panelId);
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
function initPostalCodeLookup() {
 const cpInput = document.getElementById('code-postal');
 if (!cpInput) return;
 const villeGroup  = document.getElementById('ville-group');
 const villeSelect = document.getElementById('ville-auto');
 if (!villeGroup || !villeSelect) return;

 // Safe helper: reset select to default option (no innerHTML)
 function resetSelect() {
  villeSelect.textContent = '';
  var defOpt = document.createElement('option');
  defOpt.value = '';
  defOpt.disabled = true;
  defOpt.selected = true;
  defOpt.textContent = 'Sélectionnez votre ville';
  villeSelect.appendChild(defOpt);
 }

 let debounce = null;
 cpInput.addEventListener('input', () => {
  clearTimeout(debounce);
  const cp = cpInput.value.trim();
  if (cp.length !== 5 || !/^\d{5}$/.test(cp)) {
   villeGroup.style.display = 'none';
   resetSelect();
   return;
  }
  debounce = setTimeout(async () => {
   try {
    const res = await fetch('https://geo.api.gouv.fr/communes?codePostal=' + cp + '&fields=nom&format=json');
    const communes = await res.json();
    if (!Array.isArray(communes) || !communes.length) {
     villeGroup.style.display = 'none';
     return;
    }
    villeGroup.style.display = '';
    villeSelect.textContent = '';
    if (communes.length === 1) {
     var opt = document.createElement('option');
     opt.value = communes[0].nom;
     opt.selected = true;
     opt.textContent = communes[0].nom;
     villeSelect.appendChild(opt);
    } else {
     resetSelect();
     communes.forEach(function(c) {
      var o = document.createElement('option');
      o.value = c.nom;
      o.textContent = c.nom;
      villeSelect.appendChild(o);
     });
    }
   } catch (e) {
    villeGroup.style.display = 'none';
   }
  }, 300);
 });
}
function initSingleVideoPlayback() {
 if (typeof Vimeo === 'undefined' || typeof Vimeo.Player === 'undefined') return;
 const allPlayers = [];
 function pauseAllExcept(active) {
  allPlayers.forEach(p => { if (p !== active) p.pause().catch(() => {}); });
 }
 function registerPlayer(iframe) {
  try {
   const player = new Vimeo.Player(iframe);
   allPlayers.push(player);
   player.on('play', () => pauseAllExcept(player));
   return player;
  } catch (e) { return null; }
 }
 // Iframes Vimeo déjà présentes (témoignages)
 document.querySelectorAll('iframe[src*="vimeo.com"]').forEach(registerPlayer);
 // Iframe modale (src dynamique)
 const modalIframe = document.getElementById('vimeo-modal-iframe');
 if (modalIframe) {
  let modalPlayer = null;
  const obs = new MutationObserver(() => {
   if (modalIframe.src && modalIframe.src.includes('vimeo.com')) {
    if (modalPlayer) {
     const idx = allPlayers.indexOf(modalPlayer);
     if (idx > -1) allPlayers.splice(idx, 1);
    }
    modalPlayer = registerPlayer(modalIframe);
   }
  });
  obs.observe(modalIframe, { attributes: true, attributeFilter: ['src'] });
 }
}
function fixFrenchPunctuation() {
 var cache = new Map();
 var walker = document.createTreeWalker(
  document.body, NodeFilter.SHOW_TEXT, null
 );
 var node;
 while ((node = walker.nextNode())) {
  var parent = node.parentElement;
  if (!parent) continue;
  if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') continue;
  var skip;
  if (cache.has(parent)) { skip = cache.get(parent); }
  else {
   var font = window.getComputedStyle(parent).fontFamily;
   skip = font.indexOf('Gotham Rounded') !== -1;
   cache.set(parent, skip);
  }
  if (skip) continue;
  var fixed = node.textContent.replace(/ ([;:!?])/g, '\u00A0$1');
  if (fixed !== node.textContent) node.textContent = fixed;
 }
}
function initHeroVideos() {
 document.querySelectorAll('.hero-bg video, .hero-bg-vid').forEach(vid => {
  /* Force attributes — iOS requires muted+playsinline for autoplay */
  vid.muted = true;
  vid.defaultMuted = true;
  vid.playsInline = true;
  vid.loop = true;
  vid.preload = 'metadata';
  vid.setAttribute('playsinline', '');
  vid.setAttribute('webkit-playsinline', '');
  vid.setAttribute('muted', '');
  vid.setAttribute('preload', 'metadata');
  vid.volume = 0;
  /* Remove any src blocking — force load */
  vid.load();
  /* Try play immediately */
  const tryPlay = () => {
   const p = vid.play();
   if (p && p.catch) p.catch(() => {});
  };
  /* Play when ready */
  if (vid.readyState >= 2) {
   tryPlay();
  } else {
   vid.addEventListener('loadeddata', tryPlay, { once: true });
   vid.addEventListener('canplay', tryPlay, { once: true });
  }
  /* Retry after short delay */
  setTimeout(tryPlay, 800);
  /* Fallback: any tap on the section starts the video */
  const section = vid.closest('section') || vid.parentElement;
  section.addEventListener('click', () => {
   if (vid.paused) vid.play().catch(() => {});
  }, { passive: true });
  section.addEventListener('touchstart', () => {
   if (vid.paused) vid.play().catch(() => {});
  }, { passive: true });
 });
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
 initSingleVideoPlayback();
 initHeroVideos();
 buildBackToTop();
 if (document.getElementById('contact-form'))  { initContactForm(); initPostalCodeLookup(); }
 if (document.getElementById('map'))           initMap();
 if (document.querySelector('.formation-tab-btn')) initFormationTabs();
 if (document.querySelector('.filtre-btn[data-filter]')) initFormationFilters();
 if (document.querySelector('.fcard-cat')) initFormationCardClick();
 initTogglePanel('etude-toggle-btn', 'etude-pdf-panel');
 initTogglePanel('programme-toggle-btn', 'programme-pdf-panel');
 if (document.fonts && document.fonts.ready) {
 document.fonts.ready.then(fixFrenchPunctuation);
 } else {
 fixFrenchPunctuation();
 }
});