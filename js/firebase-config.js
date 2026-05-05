import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { firebaseConfig } from './firebase-keys.js';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Helper to get site config from Firestore
export async function getSiteConfig() {
    try {
        const docRef = doc(db, "settings", "siteConfig");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
    } catch (e) {
        console.error("Error fetching config from Firebase:", e);
    }
    return null; // Return null if not found
}

// Helper to save site config to Firestore
export async function saveSiteConfig(newConfig) {
    try {
        await setDoc(doc(db, "settings", "siteConfig"), newConfig);
        return true;
    } catch (e) {
        console.error("Error saving config:", e);
        return false;
    }
}

// Helper to upload an image to Firebase Storage
export async function uploadImage(file, path) {
    if (!file) return null;
    
    // Create a unique filename
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${path}/${filename}`);
    
    try {
        const snapshot = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}
