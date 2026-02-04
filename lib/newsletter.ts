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

export const getAllSubscribers = async () => {
    try {
        const subscribersRef = collection(db, 'subscribers')
        const querySnapshot = await getDocs(query(subscribersRef))
        return querySnapshot.docs.map((doc) => doc.data().email as string)
    } catch (error) {
        console.error('Error fetching subscribers:', error)
        return []
    }
}
