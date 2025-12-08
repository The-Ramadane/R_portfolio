import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
let app: FirebaseApp | undefined;
let db: any;
let auth: any;
let analytics: any = null;

try {
    if (getApps().length === 0) {
        // Only initialize if we have the config. This prevents crashes during build or if env vars are missing
        if (firebaseConfig.apiKey) {
            app = initializeApp(firebaseConfig)
        }
    } else {
        app = getApps()[0]
    }

    if (app) {
        db = getFirestore(app)
        auth = getAuth(app)

        // Analytics only works in the browser
        if (typeof window !== 'undefined') {
            import('firebase/analytics').then(({ getAnalytics }) => {
                analytics = getAnalytics(app)
            }).catch(err => console.error("Firebase Analytics failed to load", err))
        }
    } else {
        console.warn("Firebase not initialized: Missing configuration or API Key.")
    }

} catch (error) {
    console.error("Firebase initialization error:", error)
}

export { db, auth, analytics }
