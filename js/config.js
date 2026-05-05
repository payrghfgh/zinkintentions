// ====================================================
// ZINKINTENTIONS — MASTER SITE CONFIGURATION
// Edit here OR via the Admin Panel at /admin.html
// ====================================================
const siteConfig = {

    // ── GLOBAL BRAND ────────────────────────────────
    brandName: "Zinkintentions",
    tagline: "Handcrafted artwork",
    whatsappNumber: "919873074795",
    whatsappMessage: "Hi, I am interested in your artwork!",
    instagramUrl: "https://instagram.com/zinkintentions",
    email: "hello@zinkintentions.com",
    address: "Gurgaon",
    phone: "9873074795",

    // ── ANNOUNCEMENT BANNER ─────────────────────────
    announcement: {
        enabled: false,
        text: "🎨 New collection dropping this month! Follow on Instagram for updates.",
        bgColor: "#d4af37",
        textColor: "#1a1a1a"
    },

    // ── NAVIGATION ─────────────────────────────────
    nav: {
        links: [
            { label: "Home",            href: "index.html",    visible: true },
            { label: "About Artist",    href: "about.html",    visible: true },
            { label: "Portfolio",       href: "portfolio.html",visible: true },
            { label: "Behind the Scenes",href: "process.html", visible: true },
            { label: "Coming Soon",     href: "paintings.html",visible: true }
        ]
    },

    // ── HOMEPAGE HERO ───────────────────────────────
    hero: {
        title: "Zinkintentions",
        subtitle: "Handcrafted artwork",
        buttonText: "Explore Art",
        buttonLink: "portfolio.html"
    },

    // ── ABOUT PAGE ──────────────────────────────────
    about: {
        title: "About the Artist",
        subtitle: "A Journey in Canvas and Color",
        quote: "Something created from her hands, her version.",
        description1: "Welcome to Zinkintentions. This is a space dedicated to the beauty of handcrafted artwork and paintings.",
        description2: "Every piece is an exploration of form, emotion, and visual storytelling, capturing moments and feelings that words simply cannot express.",
        description3: "Authenticity is at the core of everything I make. You won't find mass-produced prints here—only original, handmade works that bring warmth, elegance, and unique character to your space.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1471&auto=format&fit=crop",
        ctaText: "View Collection",
        ctaLink: "portfolio.html"
    },

    // ── PORTFOLIO PAGE ──────────────────────────────
    portfolio: {
        pageTitle: "Artwork Collection",
        pageSubtitle: "Handcrafted pieces available for purchase",
        buyButtonText: "Contact to Buy",
        viewInstagramText: "View on Instagram",
        soldLabel: "Sold"
    },

    // ── COMING SOON PAGE ────────────────────────────
    comingSoon: {
        title: "New Collection",
        subtitle: "A special series of exclusive paintings is currently in progress.",
        badge: "Coming Soon",
        buttonText: "Follow for updates",
        buttonLink: "" // defaults to instagramUrl if empty
    },

    // ── PROCESS PAGE ────────────────────────────────
    processPage: {
        title: "Behind the Scenes",
        subtitle: "The art creation process"
    },

    // ── FOOTER ──────────────────────────────────────
    footer: {
        tagline: "Handcrafted artwork and paintings. Something created from her hands, her version.",
        copyright: "" // auto-generated if empty
    },

    // ── THEME COLORS ────────────────────────────────
    theme: {
        primaryColor: "#1a1a1a",
        accentColor: "#d4af37",
        surfaceColor: "#ffffff",
        textColor: "#333333",
        textLight: "#777777"
    },

    // ── SEO PER-PAGE ────────────────────────────────
    seo: {
        home:      { title: "Zinkintentions | Handcrafted Artwork",          description: "Zinkintentions by an independent artist selling unique, handcrafted artwork and paintings." },
        about:     { title: "About Artist | Zinkintentions",                 description: "Learn more about the independent artist behind Zinkintentions." },
        portfolio: { title: "Portfolio | Zinkintentions",                    description: "Explore the portfolio of Zinkintentions." },
        process:   { title: "Behind the Scenes | Zinkintentions",            description: "Take a look behind the scenes at the artistic process of Zinkintentions." },
        paintings: { title: "Paintings | Zinkintentions",                    description: "New paintings coming soon to Zinkintentions." }
    },

    // ── CUSTOM SCRIPTS & CSS ────────────────────────
    customScripts: {
        head: "",
        footer: "",
        css: ""
    },

    // ── ARTWORKS ────────────────────────────────────
    artworks: [
        {
            id: 1,
            title: "Serene Shadows",
            price: "₹15,000",
            imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1458&auto=format&fit=crop",
            description: "A unique handcrafted piece with deep textures and calming tones.",
            available: true,
            featured: true
        },
        {
            id: 2,
            title: "Golden Hour Texture",
            price: "₹22,000",
            imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1445&auto=format&fit=crop",
            description: "Capturing the warmth of the setting sun through layered palette knife work.",
            available: true,
            featured: false
        },
        {
            id: 3,
            title: "Abstract Whispers",
            price: "₹18,500",
            imageUrl: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1444&auto=format&fit=crop",
            description: "Soft strokes and muted colors that speak to the soul.",
            available: true,
            featured: false
        },
        {
            id: 4,
            title: "Oceanic Depths",
            price: "₹25,000",
            imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1468&auto=format&fit=crop",
            description: "A powerful representation of the sea's mystery and depth.",
            available: false,
            featured: false
        }
    ],

    // ── PROCESS STEPS ───────────────────────────────
    process: [
        {
            title: "1. Inspiration & Colors",
            description: "Every piece begins with a mood. Selecting the right color palette is crucial for setting the tone of the artwork.",
            imageUrl: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=1410&auto=format&fit=crop"
        },
        {
            title: "2. Texture & Layers",
            description: "Building up layers of paint and texture. This stage is messy, raw, and completely intuitive.",
            imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1480&auto=format&fit=crop"
        },
        {
            title: "3. The Final Details",
            description: "Stepping back, refining edges, and adding the subtle highlights that bring the entire canvas to life.",
            imageUrl: "https://images.unsplash.com/photo-1596484552993-9c849103c80a?q=80&w=1470&auto=format&fit=crop"
        }
    ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteConfig;
}
export default siteConfig;
