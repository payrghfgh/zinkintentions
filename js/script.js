// Main Logic File — Fully Config-Driven
import { getSiteConfig } from './firebase-config.js';
import localConfig from './config.js';

let siteConfig = localConfig;

document.addEventListener('DOMContentLoaded', async () => {
    // Inject Loading Screen
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.prepend(loader);

    // Load live config from Firebase
    const liveConfig = await getSiteConfig();
    if (liveConfig) {
        siteConfig = liveConfig;
    }
    window.siteConfig = siteConfig;

    // Apply Theme, SEO, then re-render components with live config
    applyTheme();
    updateMetadata();

    // Rebuild components now that siteConfig is loaded
    const path = window.location.pathname;
    const activePage = path.includes('about.html')     ? 'about'
                     : path.includes('portfolio.html') ? 'portfolio'
                     : path.includes('process.html')   ? 'process'
                     : path.includes('paintings.html') ? 'paintings'
                     : 'home';

    // Re-render navbar/footer with live config
    if (document.getElementById('navbar-placeholder')) loadNavbar(activePage);
    if (document.getElementById('footer-placeholder')) loadFooter();

    // Advanced: Custom Scripts & CSS
    loadCustomScripts();

    // Page-specific renders
    renderHero();
    renderPortfolio();
    renderAbout();
    renderProcess();
    renderComingSoon();
    renderProcessPageHeader();

    // Announcement Banner
    loadAnnouncementBanner();

    // 0. Apply Theme Settings (again to ensure it overrides everything)
    applyTheme();

    // Scroll Animations
    initScrollAnimations();

    // Remove Loader
    setTimeout(() => {
        const pLoader = document.querySelector('.page-loader');
        if (pLoader) {
            pLoader.classList.add('hidden');
            setTimeout(() => pLoader.remove(), 600);
        }
    }, 500);

    // Navbar Scroll Effect
    setTimeout(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        }

        // Mobile Menu Toggle
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.toggle('fa-bars', !navLinks.classList.contains('active'));
                icon.classList.toggle('fa-times', navLinks.classList.contains('active'));
            });
        }
    }, 150);

    // Modal close logic
    const modal = document.getElementById('artwork-modal');
    if (modal) {
        const closeBtn = document.getElementById('modal-close');
        if (closeBtn) closeBtn.addEventListener('click', closeArtworkModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeArtworkModal(); });
    }
});

// ── RENDER FUNCTIONS ──────────────────────────────────────────────────────────

function renderHero() {
    const path = window.location.pathname;
    const isHome = path.endsWith('index.html') || path === '/' || path.endsWith('zinkintentions/');
    if (!isHome) return;

    const h = siteConfig.hero || {};
    const heroTitle = document.querySelector('.hero-title');
    const heroSub   = document.querySelector('.hero-subtitle');
    const heroBtn   = document.querySelector('.hero .btn-primary');

    if (heroTitle) heroTitle.textContent = (h.title && h.title.trim()) || siteConfig.brandName;
    if (heroSub)   heroSub.textContent   = (h.subtitle && h.subtitle.trim()) || siteConfig.tagline;
    if (heroBtn) {
        heroBtn.textContent = (h.buttonText && h.buttonText.trim()) || 'Explore Art';
        heroBtn.href        = (h.buttonLink && h.buttonLink.trim())  || 'portfolio.html';
    }
}

function renderPortfolio() {
    const container = document.getElementById('artwork-grid-container');
    if (!container || !siteConfig.artworks) return;

    const pf = siteConfig.portfolio || {};
    const buyText   = (pf.buyButtonText && pf.buyButtonText.trim())      || 'Contact to Buy';
    const instaText = (pf.viewInstagramText && pf.viewInstagramText.trim())  || 'View on Instagram';
    const soldLabel = (pf.soldLabel && pf.soldLabel.trim())          || 'Sold';

    // Update page header if present
    const pageTitle = document.querySelector('main .hero-title, main h1.hero-title');
    const pageSub   = document.querySelector('main .hero-subtitle');
    if (pageTitle) pageTitle.textContent = (pf.pageTitle && pf.pageTitle.trim()) || 'Artwork Collection';
    if (pageSub)   pageSub.textContent   = (pf.pageSubtitle && pf.pageSubtitle.trim()) || 'Handcrafted pieces available for purchase';

    // Update modal button text
    const modalWABtn = document.getElementById('modal-whatsapp-btn');
    if (modalWABtn) modalWABtn.textContent = buyText;
    const modalInstaBtn = document.getElementById('modal-insta-btn');
    if (modalInstaBtn) {
        modalInstaBtn.innerHTML = `<i class="fab fa-instagram"></i> ${instaText}`;
        modalInstaBtn.href = siteConfig.instagramUrl || '#';
    }

    container.innerHTML = siteConfig.artworks.map((art, index) => {
        const isSold = art.available === false;
        return `
            <div class="artwork-card reveal-up ${isSold ? 'artwork-sold' : ''}" style="transition-delay: ${index * 0.08}s;"
                 onclick="${isSold ? '' : `openArtworkModal('${esc(art.title)}', '${esc(art.price)}', '${esc(art.imageUrl)}', '${esc(art.description || '')}')`}">
                <div class="artwork-img-wrapper">
                    <img src="${art.imageUrl}" alt="${art.title}" class="artwork-img">
                    ${isSold ? `<div class="sold-badge">${soldLabel}</div>` : ''}
                </div>
                <div class="artwork-info">
                    <h3 class="artwork-title">${art.title}</h3>
                    <p class="artwork-price">${isSold ? `<s>${art.price}</s> <span style="color:#e74c3c; margin-left:6px;">${soldLabel}</span>` : art.price}</p>
                </div>
                ${!isSold ? `
                <div class="artwork-actions">
                    <button class="btn btn-primary" onclick="buyArtwork(event, '${esc(art.title)}')">${buyText}</button>
                    <a href="${siteConfig.instagramUrl || '#'}" target="_blank" class="btn btn-outline" onclick="event.stopPropagation()">${instaText}</a>
                </div>` : ''}
            </div>`;
    }).join('');

    initScrollAnimations();
}

function renderAbout() {
    const container = document.getElementById('about-container');
    if (!container || !siteConfig.about) return;

    const a = siteConfig.about;
    container.innerHTML = `
        <div class="about-layout">
            <div class="about-image reveal-up">
                <img src="${a.imageUrl}" alt="Artist working">
            </div>
            <div class="about-content reveal-up" style="transition-delay: 0.2s;">
                <h2 class="mb-2">${a.subtitle || ''}</h2>
                <p class="mb-2">${a.description1 || ''}</p>
                <p class="mb-2">${a.description2 || ''}</p>
                ${a.quote ? `
                <div class="quote-text reveal-up" style="transition-delay: 0.3s;">
                    \u201c${a.quote}\u201d
                </div>` : ''}
                <p class="mb-3">${a.description3 || ''}</p>
                <a href="${(a.ctaLink && a.ctaLink.trim()) || 'portfolio.html'}" class="btn btn-outline">${(a.ctaText && a.ctaText.trim()) || 'View Collection'}</a>
            </div>
        </div>
    `;

    // Update the page hero title
    const pageTitle = document.querySelector('main .hero-title, main h1.hero-title');
    if (pageTitle) pageTitle.textContent = (a.title && a.title.trim()) || 'About the Artist';

    initScrollAnimations();
}

function renderProcess() {
    const container = document.getElementById('process-grid-container');
    if (!container || !siteConfig.process) return;

    container.innerHTML = siteConfig.process.map((step, index) => `
        <div class="process-item reveal-up" style="transition-delay: ${index * 0.15}s;">
            <img src="${step.imageUrl}" alt="${step.title}" class="process-img">
            <h3 class="mb-1">${step.title}</h3>
            <p class="text-light">${step.description}</p>
        </div>
    `).join('');

    initScrollAnimations();
}

function renderProcessPageHeader() {
    const path = window.location.pathname;
    if (!path.includes('process.html')) return;
    const pp = siteConfig.processPage || {};
    const title = document.querySelector('main .hero-title, main h1');
    const sub   = document.querySelector('main .hero-subtitle');
    if (title && pp.title)    title.textContent = pp.title;
    if (sub   && pp.subtitle) sub.textContent   = pp.subtitle;
}

function renderComingSoon() {
    const path = window.location.pathname;
    if (!path.includes('paintings.html')) return;

    const cs = siteConfig.comingSoon || {};
    const heroTitle = document.getElementById('cs-title');
    const heroSub   = document.getElementById('cs-subtitle');
    const heroBadge = document.getElementById('cs-badge');
    const heroBtn   = document.getElementById('cs-btn');

    if (heroTitle) heroTitle.textContent = (cs.title && cs.title.trim())  || 'New Collection';
    if (heroSub)   heroSub.textContent   = (cs.subtitle && cs.subtitle.trim()) || 'A special series of exclusive paintings is currently in progress.';
    if (heroBadge) heroBadge.textContent = (cs.badge && cs.badge.trim())  || 'Coming Soon';
    if (heroBtn) {
        heroBtn.textContent = (cs.buttonText && cs.buttonText.trim()) || 'Follow for updates';
        heroBtn.href        = (cs.buttonLink && cs.buttonLink.trim()) || siteConfig.instagramUrl || '#';
    }
}

// ── MODAL ────────────────────────────────────────────────────────────────────

function openArtworkModal(title, price, img, desc) {
    const modal = document.getElementById('artwork-modal');
    if (!modal) return;

    document.getElementById('modal-img').src     = img;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-price').textContent = price;
    const modalDesc = document.querySelector('.modal-desc');
    if (modalDesc) modalDesc.textContent = desc || 'This is a unique handcrafted piece. Due to its authentic nature, slight variations in texture and color are part of its charm.';

    const message = encodeURIComponent(`Hi, I want to buy the painting ${title}`);
    const waBtn = document.getElementById('modal-whatsapp-btn');
    if (waBtn) waBtn.href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
    const instaBtn = document.getElementById('modal-insta-btn');
    if (instaBtn) instaBtn.href = siteConfig.instagramUrl;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeArtworkModal() {
    const modal = document.getElementById('artwork-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function buyArtwork(event, title) {
    if (event) event.stopPropagation();
    const message = encodeURIComponent(`Hi, I want to buy the painting ${title}`);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, '_blank');
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function esc(str) {
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function applyTheme() {
    if (!siteConfig.theme) return;
    const root = document.documentElement;
    const t = siteConfig.theme;
    
    root.style.setProperty('--primary-color', t.primaryColor || '#1a1a1a');
    root.style.setProperty('--accent-color',  t.accentColor  || '#d4af37');
    root.style.setProperty('--surface-color', t.surfaceColor || '#ffffff');
    root.style.setProperty('--text-color',    t.textColor    || '#333333');
}

function updateMetadata() {
    if (!siteConfig.seo) return;
    const path = window.location.pathname;
    const key = path.includes('about.html')     ? 'about'
              : path.includes('portfolio.html') ? 'portfolio'
              : path.includes('process.html')   ? 'process'
              : path.includes('paintings.html') ? 'paintings'
              : 'home';
    const seo = siteConfig.seo[key];
    if (!seo) return;
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', seo.description);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up:not(.active)').forEach(el => observer.observe(el));
}

function loadCustomScripts() {
    const cs = siteConfig.customScripts;
    if (!cs) return;

    // Inject Head Scripts
    if (cs.head) {
        const div = document.createElement('div');
        div.innerHTML = cs.head;
        Array.from(div.children).forEach(el => {
            if (el.tagName === 'SCRIPT') {
                const s = document.createElement('script');
                if (el.src) s.src = el.src;
                s.innerHTML = el.innerHTML;
                document.head.appendChild(s);
            } else {
                document.head.appendChild(el.cloneNode(true));
            }
        });
    }

    // Inject Custom CSS
    if (cs.css) {
        const style = document.createElement('style');
        style.innerHTML = cs.css;
        document.head.appendChild(style);
    }

    // Inject Footer Scripts
    if (cs.footer) {
        const div = document.createElement('div');
        div.innerHTML = cs.footer;
        Array.from(div.children).forEach(el => {
            if (el.tagName === 'SCRIPT') {
                const s = document.createElement('script');
                if (el.src) s.src = el.src;
                s.innerHTML = el.innerHTML;
                document.body.appendChild(s);
            } else {
                document.body.appendChild(el.cloneNode(true));
            }
        });
    }
}

