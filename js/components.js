// Reusable UI Components

function loadNavbar(activePage = 'home') {
    const navbarHTML = `
        <nav class="navbar" id="navbar">
            <div class="navbar-container">
                <a href="index.html" class="nav-brand">ZinkIntentions</a>
                <div class="nav-links" id="nav-links">
                    <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
                    <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About Artist</a>
                    <a href="portfolio.html" class="nav-link ${activePage === 'portfolio' ? 'active' : ''}">Portfolio</a>
                    <a href="process.html" class="nav-link ${activePage === 'process' ? 'active' : ''}">Behind the Scenes</a>
                    <a href="paintings.html" class="nav-link ${activePage === 'paintings' ? 'active' : ''}">Coming Soon</a>
                    <div class="nav-social">
                        <a href="https://instagram.com/zinkintentions" target="_blank" aria-label="Instagram">
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
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col">
                        <h4>ZinkIntentions</h4>
                        <p>Handcrafted artwork and paintings. Something created from her hands, her version.</p>
                    </div>
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <a href="index.html">Home</a>
                        <a href="portfolio.html">Shop Art</a>
                        <a href="about.html">About the Artist</a>
                    </div>
                    <div class="footer-col">
                        <h4>Contact</h4>
                        <p>Phone: 9873074795</p>
                        <p>Email: hello@zinkintentions.com</p>
                        <p>Address: Gurgaon</p>
                        <a href="https://instagram.com/zinkintentions" target="_blank"><i class="fab fa-instagram"></i> @zinkintentions</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} ZinkIntentions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

function loadWhatsAppWidget() {
    const whatsappHTML = `
        <a href="https://wa.me/919873074795?text=Hi%2C%20I%20am%20interested%20in%20your%20artwork" 
           class="whatsapp-float" 
           target="_blank" 
           aria-label="Contact on WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);
}
