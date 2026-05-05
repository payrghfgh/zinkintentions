// admin.js — Full Admin Panel Logic
import { getSiteConfig, saveSiteConfig } from './firebase-config.js';
import localConfig from './config.js';

let cfg = JSON.parse(JSON.stringify(localConfig)); // deep clone
window.cfg = cfg; // expose globally for inline handlers

// ── INIT ──────────────────────────────────────────────────────────────────────
async function initAdmin() {
    showStatus('Loading live config…');
    const live = await getSiteConfig();
    if (live) {
        // Merge into cfg so reference stays the same
        Object.assign(cfg, live);
    }
    window.cfg = cfg;
    populateAll();
    showStatus('Ready', 'success', 1500);
}

function populateAll() {
    // General
    setVal('brandName',       cfg.brandName);
    setVal('tagline',         cfg.tagline);
    setVal('whatsappNumber',  cfg.whatsappNumber);
    setVal('whatsappMessage', cfg.whatsappMessage);
    setVal('instagramUrl',    cfg.instagramUrl);
    setVal('email',           cfg.email);
    setVal('phone',           cfg.phone);
    setVal('address',         cfg.address);

    // Hero
    const h = cfg.hero || {};
    setVal('heroTitle',      h.title);
    setVal('heroSubtitle',   h.subtitle);
    setVal('heroButtonText', h.buttonText);
    setVal('heroButtonLink', h.buttonLink);

    // About
    const a = cfg.about || {};
    setVal('aboutTitle',    a.title);
    setVal('aboutSubtitle', a.subtitle);
    setVal('aboutQuote',    a.quote);
    setVal('aboutDesc1',    a.description1);
    setVal('aboutDesc2',    a.description2);
    setVal('aboutDesc3',    a.description3);
    setVal('aboutCtaText',  a.ctaText);
    setVal('aboutCtaLink',  a.ctaLink);
    if (a.imageUrl) setImgPreview('aboutImgPreview', a.imageUrl);

    // Portfolio labels
    const pf = cfg.portfolio || {};
    setVal('pfPageTitle',    pf.pageTitle);
    setVal('pfPageSubtitle', pf.pageSubtitle);
    setVal('pfBuyBtn',       pf.buyButtonText);
    setVal('pfInstaBtn',     pf.viewInstagramText);
    setVal('pfSoldLabel',    pf.soldLabel);

    // Process page header
    const pp = cfg.processPage || {};
    setVal('processTitle',    pp.title);
    setVal('processSubtitle', pp.subtitle);

    // Coming Soon
    const cs = cfg.comingSoon || {};
    setVal('csTitle',    cs.title);
    setVal('csSubtitle', cs.subtitle);
    setVal('csBadge',    cs.badge);
    setVal('csBtnText',  cs.buttonText);
    setVal('csBtnLink',  cs.buttonLink);

    // Footer
    const ft = cfg.footer || {};
    setVal('footerTagline',   ft.tagline);
    setVal('footerCopyright', ft.copyright);

    // Announcement
    const ann = cfg.announcement || {};
    setCheck('annEnabled', ann.enabled);
    document.getElementById('annEnabledLabel').textContent = ann.enabled ? 'On' : 'Off';
    setVal('annText', ann.text);
    setColor('annBgColor',   'annBgHex',   ann.bgColor   || '#d4af37');
    setColor('annTextColor', 'annTextHex', ann.textColor || '#1a1a1a');

    // Theme
    const t = cfg.theme || {};
    setColor('themePrimary', 'tp', t.primaryColor || '#1a1a1a');
    setColor('themeAccent',  'ta', t.accentColor  || '#d4af37');
    setColor('themeSurface', 'ts', t.surfaceColor || '#ffffff');
    setColor('themeText',    'tt', t.textColor    || '#333333');

    // Advanced
    const cScripts = cfg.customScripts || {};
    setVal('customHead',   cScripts.head);
    setVal('customFooter', cScripts.footer);
    setVal('customCss',    cScripts.css);

    // Artworks, Process, SEO, Nav
    renderArtworks();
    renderProcessSteps();
    renderSEO();
    renderNav();
}

// ── ARTWORKS ──────────────────────────────────────────────────────────────────
window.addArtwork = () => {
    if (!cfg.artworks) cfg.artworks = [];
    cfg.artworks.push({ id: Date.now(), title: 'New Artwork', price: '₹0', description: '', imageUrl: '', available: true, featured: false });
    renderArtworks();
};
window.removeArtwork = (i) => { cfg.artworks.splice(i, 1); renderArtworks(); };
window.moveArtwork   = (i, d) => { moveItem(cfg.artworks, i, d); renderArtworks(); };
window.toggleAvailable = (i, val) => { cfg.artworks[i].available = val; };
window.toggleFeatured  = (i, val) => { cfg.artworks[i].featured  = val; };
window.updateArtwork   = (i, k, v) => { cfg.artworks[i][k] = v; };

function renderArtworks() {
    const el = document.getElementById('artworks-list');
    if (!el) return;
    el.innerHTML = (cfg.artworks || []).map((art, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-num">${i+1}</span>
                <div class="item-actions">
                    <button class="ia-btn up" onclick="window.moveArtwork(${i},-1)"><i class="fas fa-arrow-up"></i></button>
                    <button class="ia-btn dn" onclick="window.moveArtwork(${i},1)"><i class="fas fa-arrow-down"></i></button>
                    <button class="ia-btn rm" onclick="window.removeArtwork(${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:.75rem">
                <div class="adm-field"><label>Title</label>
                    <input type="text" value="${esc(art.title)}" oninput="window.updateArtwork(${i},'title',this.value)"></div>
                <div class="adm-field"><label>Price</label>
                    <input type="text" value="${esc(art.price)}" oninput="window.updateArtwork(${i},'price',this.value)"></div>
            </div>
            <div class="adm-field"><label>Description</label>
                <textarea rows="2" oninput="window.updateArtwork(${i},'description',this.value)">${esc(art.description||'')}</textarea></div>
            <div style="display:flex;gap:2rem;margin-bottom:.75rem">
                <div class="toggle-wrap">
                    <label class="toggle"><input type="checkbox" ${art.available!==false?'checked':''} onchange="window.toggleAvailable(${i},this.checked)"><span class="toggle-slider"></span></label>
                    <span style="font-size:.85rem;font-weight:600">Available for Sale</span>
                </div>
                <div class="toggle-wrap">
                    <label class="toggle"><input type="checkbox" ${art.featured?'checked':''} onchange="window.toggleFeatured(${i},this.checked)"><span class="toggle-slider"></span></label>
                    <span style="font-size:.85rem;font-weight:600">Featured</span>
                </div>
            </div>
            <div class="adm-field"><label>Image Upload</label>
                <input type="file" accept="image/*" onchange="window.handleImg(event,'artwork',${i})">
                ${art.imageUrl
                    ? `<img src="${art.imageUrl}" class="img-preview">`
                    : `<div class="img-placeholder"><span>No image</span></div>`}
            </div>
        </div>
    `).join('');
}

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
window.addProcess    = () => { if(!cfg.process)cfg.process=[]; cfg.process.push({title:'New Step',description:'',imageUrl:''}); renderProcessSteps(); };
window.removeProcess = (i) => { cfg.process.splice(i,1); renderProcessSteps(); };
window.moveProcess   = (i,d) => { moveItem(cfg.process,i,d); renderProcessSteps(); };
window.updateProcess = (i,k,v) => { cfg.process[i][k]=v; };

function renderProcessSteps() {
    const el = document.getElementById('process-list');
    if (!el) return;
    el.innerHTML = (cfg.process||[]).map((step,i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-num">${i+1}</span>
                <div class="item-actions">
                    <button class="ia-btn up" onclick="window.moveProcess(${i},-1)"><i class="fas fa-arrow-up"></i></button>
                    <button class="ia-btn dn" onclick="window.moveProcess(${i},1)"><i class="fas fa-arrow-down"></i></button>
                    <button class="ia-btn rm" onclick="window.removeProcess(${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="adm-field"><label>Step Title</label>
                <input type="text" value="${esc(step.title)}" oninput="window.updateProcess(${i},'title',this.value)"></div>
            <div class="adm-field"><label>Description</label>
                <textarea rows="2" oninput="window.updateProcess(${i},'description',this.value)">${esc(step.description||'')}</textarea></div>
            <div class="adm-field"><label>Image</label>
                <input type="file" accept="image/*" onchange="window.handleImg(event,'process',${i})">
                ${step.imageUrl
                    ? `<img src="${step.imageUrl}" class="img-preview">`
                    : `<div class="img-placeholder"><span>No image</span></div>`}
            </div>
        </div>
    `).join('');
}

// ── SEO ───────────────────────────────────────────────────────────────────────
window.updateSeo = (key, field, val) => {
    if (!cfg.seo) cfg.seo = {};
    if (!cfg.seo[key]) cfg.seo[key] = {};
    cfg.seo[key][field] = val;
};

function renderSEO() {
    const el = document.getElementById('seo-list');
    if (!el || !cfg.seo) return;
    const pages = { home:'🏠 Home', about:'👤 About Artist', portfolio:'🖼 Portfolio', process:'🎨 Behind the Scenes', paintings:'⏳ Coming Soon' };
    el.innerHTML = Object.entries(pages).map(([key, label]) => {
        const s = cfg.seo[key] || {};
        return `
        <div class="seo-page">
            <div class="seo-page-label">${label}</div>
            <div class="adm-field"><label>Page Title Tag</label>
                <input type="text" value="${esc(s.title||'')}" oninput="window.updateSeo('${key}','title',this.value)"></div>
            <div class="adm-field"><label>Meta Description</label>
                <textarea rows="2" oninput="window.updateSeo('${key}','description',this.value)">${esc(s.description||'')}</textarea></div>
        </div>`;
    }).join('');
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────
window.updateNavLink  = (i, k, v) => { if (cfg.nav && cfg.nav.links) cfg.nav.links[i][k] = v; };

function renderNav() {
    const el = document.getElementById('nav-links-list');
    if (!el || !cfg.nav || !cfg.nav.links) return;
    el.innerHTML = cfg.nav.links.map((link, i) => `
        <div class="nav-link-row">
            <span style="color:var(--muted);font-size:.8rem;width:120px">${link.href}</span>
            <div class="nav-link-label">
                <input type="text" value="${esc(link.label)}" placeholder="Link label"
                    oninput="window.updateNavLink(${i},'label',this.value)">
            </div>
            <div class="toggle-wrap">
                <label class="toggle">
                    <input type="checkbox" ${link.visible!==false?'checked':''}
                        onchange="window.updateNavLink(${i},'visible',this.checked)">
                    <span class="toggle-slider"></span>
                </label>
                <span style="font-size:.8rem">${link.visible!==false?'Shown':'Hidden'}</span>
            </div>
        </div>
    `).join('');
}

// ── IMAGE HANDLING ────────────────────────────────────────────────────────────
window.handleImg = (e, type, index) => {
    const file = e.target.files[0];
    if (!file) return;
    compressImage(file, base64 => {
        if (type === 'about') {
            cfg.about.imageUrl = base64;
            setImgPreview('aboutImgPreview', base64);
        } else if (type === 'artwork') {
            cfg.artworks[index].imageUrl = base64;
            renderArtworks();
        } else if (type === 'process') {
            cfg.process[index].imageUrl = base64;
            renderProcessSteps();
        }
    });
};

function compressImage(file, cb) {
    const reader = new FileReader();
    reader.onload = e => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const MAX = 900;
            let w = img.width, h = img.height;
            if (w > h) { if (w > MAX) { h = h*MAX/w; w = MAX; } }
            else       { if (h > MAX) { w = w*MAX/h; h = MAX; } }
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            cb(canvas.toDataURL('image/jpeg', 0.65));
        };
    };
    reader.readAsDataURL(file);
}

// ── SAVE ──────────────────────────────────────────────────────────────────────
window.adminSave = async () => {
    const passcode = document.getElementById('adminSecret').value;
    if (!passcode) { showStatus('⚠ Enter passcode first', 'error'); return; }

    // Collect all field values
    cfg.brandName       = getVal('brandName');
    cfg.tagline         = getVal('tagline');
    cfg.whatsappNumber  = getVal('whatsappNumber');
    cfg.whatsappMessage = getVal('whatsappMessage');
    cfg.instagramUrl    = getVal('instagramUrl');
    cfg.email           = getVal('email');
    cfg.phone           = getVal('phone');
    cfg.address         = getVal('address');

    if (!cfg.hero) cfg.hero = {};
    cfg.hero.title      = getVal('heroTitle');
    cfg.hero.subtitle   = getVal('heroSubtitle');
    cfg.hero.buttonText = getVal('heroButtonText');
    cfg.hero.buttonLink = getVal('heroButtonLink');

    if (!cfg.about) cfg.about = {};
    cfg.about.title       = getVal('aboutTitle');
    cfg.about.subtitle    = getVal('aboutSubtitle');
    cfg.about.quote       = getVal('aboutQuote');
    cfg.about.description1= getVal('aboutDesc1');
    cfg.about.description2= getVal('aboutDesc2');
    cfg.about.description3= getVal('aboutDesc3');
    cfg.about.ctaText     = getVal('aboutCtaText');
    cfg.about.ctaLink     = getVal('aboutCtaLink');

    if (!cfg.portfolio) cfg.portfolio = {};
    cfg.portfolio.pageTitle        = getVal('pfPageTitle');
    cfg.portfolio.pageSubtitle     = getVal('pfPageSubtitle');
    cfg.portfolio.buyButtonText    = getVal('pfBuyBtn');
    cfg.portfolio.viewInstagramText= getVal('pfInstaBtn');
    cfg.portfolio.soldLabel        = getVal('pfSoldLabel');

    if (!cfg.processPage) cfg.processPage = {};
    cfg.processPage.title    = getVal('processTitle');
    cfg.processPage.subtitle = getVal('processSubtitle');

    if (!cfg.comingSoon) cfg.comingSoon = {};
    cfg.comingSoon.title      = getVal('csTitle');
    cfg.comingSoon.subtitle   = getVal('csSubtitle');
    cfg.comingSoon.badge      = getVal('csBadge');
    cfg.comingSoon.buttonText = getVal('csBtnText');
    cfg.comingSoon.buttonLink = getVal('csBtnLink');

    if (!cfg.footer) cfg.footer = {};
    cfg.footer.tagline   = getVal('footerTagline');
    cfg.footer.copyright = getVal('footerCopyright');

    if (!cfg.announcement) cfg.announcement = {};
    cfg.announcement.enabled   = document.getElementById('annEnabled').checked;
    cfg.announcement.text      = getVal('annText');
    cfg.announcement.bgColor   = document.getElementById('annBgColor').value;
    cfg.announcement.textColor = document.getElementById('annTextColor').value;

    if (!cfg.theme) cfg.theme = {};
    cfg.theme.primaryColor = document.getElementById('themePrimary').value;
    cfg.theme.accentColor  = document.getElementById('themeAccent').value;
    cfg.theme.surfaceColor = document.getElementById('themeSurface').value;
    cfg.theme.textColor    = document.getElementById('themeText').value;

    if (!cfg.customScripts) cfg.customScripts = {};
    cfg.customScripts.head   = getVal('customHead');
    cfg.customScripts.footer = getVal('customFooter');
    cfg.customScripts.css    = getVal('customCss');

    cfg.adminSecret = passcode;

    const btn = document.getElementById('save-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving…';
    showStatus('Pushing to Firebase…');

    try {
        const ok = await saveSiteConfig(cfg);
        if (ok) {
            showStatus('✅ Live site updated!', 'success');
        } else {
            showStatus('❌ Save failed — wrong passcode?', 'error');
        }
    } catch (err) {
        console.error(err);
        showStatus('❌ Error: ' + err.message, 'error');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Push to Live Site';
};

// ── UTILS ─────────────────────────────────────────────────────────────────────
function getVal(id)        { const el = document.getElementById(id); return el ? el.value : ''; }
function setVal(id, v)     { const el = document.getElementById(id); if (el && v != null) el.value = v; }
function setCheck(id, v)   { const el = document.getElementById(id); if (el) el.checked = !!v; }
function setImgPreview(id, src) { const el = document.getElementById(id); if(el){el.src=src;el.style.display='block';} }
function setColor(inputId, hexId, val) {
    const inp = document.getElementById(inputId);
    const hex = document.getElementById(hexId);
    if (inp) inp.value = val;
    if (hex) hex.textContent = val.toUpperCase();
}
function moveItem(arr, i, d) {
    const t = i + d;
    if (t < 0 || t >= arr.length) return;
    [arr[i], arr[t]] = [arr[t], arr[i]];
}
function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

let statusTimer;
function showStatus(msg, type='', duration=0) {
    const el = document.getElementById('adm-status');
    el.textContent = msg;
    el.className = type;
    el.style.display = 'block';
    clearTimeout(statusTimer);
    if (duration > 0) {
        statusTimer = setTimeout(() => { el.style.display = 'none'; }, duration);
    }
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
initAdmin();
