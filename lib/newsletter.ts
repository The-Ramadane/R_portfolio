import { db } from './firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'

export const subscribeToNewsletter = async (email: string) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address.')
    }

    try {
        const subscribersRef = collection(db, 'subscribers')

        // Check if email already exists
        const q = query(subscribersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            throw new Error('You are already subscribed!')
        }

        await addDoc(subscribersRef, {
            email,
            subscribedAt: serverTimestamp(),
        })

        return { success: true }
    } catch (error: any) {
        console.error('Error subscribing to newsletter:', error)
        throw new Error(error.message || 'Something went wrong. Please try again.')
    }
}
