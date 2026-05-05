// Centralized Site Content and Artworks
const siteConfig = {
    brandName: "ZinkIntentions",
    tagline: "Handcrafted artwork",
    whatsappNumber: "919873074795",
    instagramUrl: "https://instagram.com/zinkintentions",
    email: "hello@zinkintentions.com",
    address: "Gurgaon",
    phone: "9873074795",
    
    about: {
        title: "About the Artist",
        subtitle: "A Journey in Canvas and Color",
        quote: "Something created from her hands, her version.",
        description1: "Welcome to ZinkIntentions. This is a space dedicated to the beauty of handcrafted artwork and paintings.",
        description2: "Every piece is an exploration of form, emotion, and visual storytelling, capturing moments and feelings that words simply cannot express.",
        description3: "Authenticity is at the core of everything I make. You won't find mass-produced prints here—only original, handmade works that bring warmth, elegance, and unique character to your space.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1471&auto=format&fit=crop"
    },

    artworks: [
        {
            id: 1,
            title: "Serene Shadows",
            price: "₹15,000",
            imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1458&auto=format&fit=crop",
            description: "A unique handcrafted piece with deep textures and calming tones."
        },
        {
            id: 2,
            title: "Golden Hour Texture",
            price: "₹22,000",
            imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1445&auto=format&fit=crop",
            description: "Capturing the warmth of the setting sun through layered palette knife work."
        },
        {
            id: 3,
            title: "Abstract Whispers",
            price: "₹18,500",
            imageUrl: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1444&auto=format&fit=crop",
            description: "Soft strokes and muted colors that speak to the soul."
        },
        {
            id: 4,
            title: "Oceanic Depths",
            price: "₹25,000",
            imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1468&auto=format&fit=crop",
            description: "A powerful representation of the sea's mystery and depth."
        }
    ],

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
