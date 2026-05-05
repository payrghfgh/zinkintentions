// Main Logic File
import { getSiteConfig } from './firebase-config.js';
import localConfig from './config.js';

let siteConfig = localConfig;

document.addEventListener('DOMContentLoaded', async () => {
    // Attempt to load live config from Firebase
    const liveConfig = await getSiteConfig();
    if (liveConfig) {
        siteConfig = liveConfig;
        window.siteConfig = liveConfig; // Keep it globally accessible for inline scripts if needed
    } else {
        window.siteConfig = localConfig;
    }

    // 0. Load Content from Config (If on relevant pages)
    renderPortfolio();
    renderAbout();
    renderProcess();
    updateBrandInfo();

    // 1. Setup Navbar Scroll Effect
    const setupNavbar = () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    };

    // 2. Setup Mobile Menu Toggle
    const setupMobileMenu = () => {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = menuBtn.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    };

    // Initialize UI features (Give a slight delay in case components.js just loaded them)
    setTimeout(() => {
        setupNavbar();
        setupMobileMenu();
    }, 100);

    // Modal Logic
    const modal = document.getElementById('artwork-modal');
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalPrice = document.getElementById('modal-price');
        const closeBtn = document.getElementById('modal-close');
        const whatsappBtn = document.getElementById('modal-whatsapp-btn');
        const instaBtn = document.getElementById('modal-insta-btn');

        // Setup Open Modal
        const artworkCards = document.querySelectorAll('.artwork-card');
        artworkCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.getAttribute('data-img');
                const title = card.getAttribute('data-title');
                const price = card.getAttribute('data-price');
                
                modalImg.src = img;
                modalTitle.textContent = title;
                modalPrice.textContent = price;
                
                // Set WhatsApp Button URL dynamically
                const message = encodeURIComponent(`Hi, I want to buy the painting ${title}`);
                whatsappBtn.href = `https://wa.me/919873074795?text=${message}`;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            });
        });

        // Setup Close Modal
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Helper function to buy an artwork directly without opening modal
function buyArtwork(event, title) {
    if (event) event.stopPropagation(); // Prevent opening the modal
    const message = encodeURIComponent(`Hi, I want to buy the painting ${title}`);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`, '_blank');
}

// Dynamic Rendering Functions
function renderPortfolio() {
    const container = document.getElementById('artwork-grid-container');
    if (!container || !siteConfig.artworks) return;

    container.innerHTML = siteConfig.artworks.map(art => `
        <div class="artwork-card" 
             data-title="${art.title}" 
             data-price="${art.price}" 
             data-img="${art.imageUrl}"
             onclick="openArtworkModal('${art.title}', '${art.price}', '${art.imageUrl}', '${art.description || ''}')">
            <div class="artwork-img-wrapper">
                <img src="${art.imageUrl}" alt="${art.title}" class="artwork-img">
            </div>
            <div class="artwork-info">
                <h3 class="artwork-title">${art.title}</h3>
                <p class="artwork-price">${art.price}</p>
            </div>
            <div class="artwork-actions">
                <button class="btn btn-primary" onclick="buyArtwork(event, '${art.title}')">Contact to Buy</button>
                <a href="${siteConfig.instagramUrl}" target="_blank" class="btn btn-outline" onclick="event.stopPropagation()">View on Instagram</a>
            </div>
        </div>
    `).join('');
}

function openArtworkModal(title, price, img, desc) {
    const modal = document.getElementById('artwork-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.querySelector('.modal-desc');
    const whatsappBtn = document.getElementById('modal-whatsapp-btn');

    modalImg.src = img;
    modalTitle.textContent = title;
    modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc || "This is a unique handcrafted piece. Due to its authentic nature, slight variations in texture and color are part of its charm.";
    
    const message = encodeURIComponent(`Hi, I want to buy the painting ${title}`);
    whatsappBtn.href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderAbout() {
    const container = document.getElementById('about-container');
    if (!container || !siteConfig.about) return;

    container.innerHTML = `
        <div class="about-layout">
            <div class="about-image">
                <img src="${siteConfig.about.imageUrl}" alt="Artist working">
            </div>
            <div class="about-content">
                <h2 class="mb-2">${siteConfig.about.subtitle}</h2>
                <p class="mb-2">${siteConfig.about.description1}</p>
                <p class="mb-2">${siteConfig.about.description2}</p>
                
                <div class="quote-text">
                    “${siteConfig.about.quote}”
                </div>
                
                <p class="mb-3">${siteConfig.about.description3}</p>
                
                <a href="portfolio.html" class="btn btn-outline">View Collection</a>
            </div>
        </div>
    `;
}

function renderProcess() {
    const container = document.getElementById('process-grid-container');
    if (!container || !siteConfig.process) return;

    container.innerHTML = siteConfig.process.map(step => `
        <div class="process-item">
            <img src="${step.imageUrl}" alt="${step.title}" class="process-img">
            <h3 class="mb-1">${step.title}</h3>
            <p class="text-light">${step.description}</p>
        </div>
    `).join('');
}

function updateBrandInfo() {
    // Update brand name in hero if it exists
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && document.body.contains(heroTitle) && !document.querySelector('.about-layout')) {
        // Only update if it's the home hero
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
             heroTitle.textContent = siteConfig.brandName;
        }
    }
}
