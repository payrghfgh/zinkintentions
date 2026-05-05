// Reusable UI Components — Driven by siteConfig

function loadNavbar(activePage = 'home') {
    // Determine page key from href
    const pageMap = {
        'index.html': 'home',
        'about.html': 'about',
        'portfolio.html': 'portfolio',
        'process.html': 'process',
        'paintings.html': 'paintings'
    };

    // Use global siteConfig if available, else use defaults
    const cfg = window.siteConfig || {};
    const brand = (cfg.brandName && cfg.brandName.trim()) || 'Zinkintentions';
    const instaUrl = (cfg.instagramUrl && cfg.instagramUrl.trim()) || 'https://instagram.com/zinkintentions';
    const navLinks = (cfg.nav && cfg.nav.links) ? cfg.nav.links : [
        { label: "Home",             href: "index.html",    visible: true },
        { label: "About Artist",     href: "about.html",    visible: true },
        { label: "Portfolio",        href: "portfolio.html",visible: true },
        { label: "Behind the Scenes",href: "process.html",  visible: true },
        { label: "Coming Soon",      href: "paintings.html",visible: true }
    ];

    const linksHTML = navLinks
        .filter(l => l.visible !== false)
        .map(l => {
            const key = pageMap[l.href] || l.href;
            const isActive = (key === activePage || l.href.includes(activePage)) ? 'active' : '';
            return `<a href="${l.href}" class="nav-link ${isActive}">${l.label}</a>`;
        }).join('');

    const navbarHTML = `
        <nav class="navbar" id="navbar">
            <div class="navbar-container">
                <a href="index.html" class="nav-brand">${brand}</a>
                <div class="nav-links" id="nav-links">
                    ${linksHTML}
                    <div class="nav-social">
                        <a href="${instaUrl}" target="_blank" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div class="mobile-menu-btn" id="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
}

function loadFooter() {
    const cfg = window.siteConfig || {};
    const brand = (cfg.brandName && cfg.brandName.trim()) || 'Zinkintentions';
    const instaUrl = (cfg.instagramUrl && cfg.instagramUrl.trim()) || 'https://instagram.com/zinkintentions';
    const instaHandle = '@' + instaUrl.split('/').pop();
    const footerTagline = (cfg.footer && cfg.footer.tagline && cfg.footer.tagline.trim()) ? cfg.footer.tagline : 'Handcrafted artwork and paintings.';
    const copyright = (cfg.footer && cfg.footer.copyright && cfg.footer.copyright.trim()) ? cfg.footer.copyright : `&copy; ${new Date().getFullYear()} ${brand}. All rights reserved.`;

    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h4>${brand}</h4>
                        <p>${footerTagline}</p>
                    </div>
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <a href="index.html">Home</a>
                        <a href="portfolio.html">Shop Art</a>
                        <a href="about.html">About the Artist</a>
                        <a href="process.html">Behind the Scenes</a>
                    </div>
                    <div class="footer-col">
                        <h4>Contact</h4>
                        <p>Phone: ${cfg.phone || ''}</p>
                        <p>Email: ${cfg.email || ''}</p>
                        <p>Address: ${cfg.address || ''}</p>
                        <a href="${instaUrl}" target="_blank"><i class="fab fa-instagram"></i> ${instaHandle}</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>${copyright}</p>
                </div>
            </div>
        </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

function loadWhatsAppWidget() {
    const cfg = window.siteConfig || {};
    const number = cfg.whatsappNumber || '919873074795';
    const message = encodeURIComponent(cfg.whatsappMessage || 'Hi, I am interested in your artwork!');
    const whatsappHTML = `
        <a href="https://wa.me/${number}?text=${message}" 
           class="whatsapp-float" 
           target="_blank" 
           aria-label="Contact on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
}

function loadAnnouncementBanner() {
    const cfg = window.siteConfig || {};
    const ann = cfg.announcement;
    if (!ann || !ann.enabled) return;
    const bannerHTML = `
        <div id="announcement-banner" style="
            background: ${ann.bgColor || '#d4af37'};
            color: ${ann.textColor || '#1a1a1a'};
            text-align: center;
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
            font-family: 'Inter', sans-serif;
            position: relative;
            z-index: 1001;
        ">
            ${ann.text}
            <span onclick="document.getElementById('announcement-banner').remove()" style="
                position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
                cursor: pointer; font-size: 1.2rem; line-height: 1;
            ">&times;</span>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', bannerHTML);
}
