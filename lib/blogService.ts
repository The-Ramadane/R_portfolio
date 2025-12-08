import { db } from './firebase'
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
} from 'firebase/firestore'

export type BlogPost = {
    id: string
    title: string
    slug: string
    description: string
    content: string
    tags: string
    cover_image: string
    published_at: string
}

const POSTS_COLLECTION = 'posts'

export const getAllPosts = async (): Promise<BlogPost[]> => {
    try {
        const q = query(
            collection(db, POSTS_COLLECTION),
            orderBy('published_at', 'desc')
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<BlogPost, 'id'>),
        }))
    } catch (error) {
        console.error('Error getting posts:', error)
        return []
    }
}

export const getPostBySlug = async (
    slug: string
): Promise<BlogPost | undefined> => {
    try {
        const q = query(collection(db, POSTS_COLLECTION), where('slug', '==', slug))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) return undefined
        const doc = querySnapshot.docs[0]
        return { id: doc.id, ...(doc.data() as Omit<BlogPost, 'id'>) }
    } catch (error) {
        console.error('Error getting post by slug:', error)
        return undefined
    }
}

export const getPostById = async (
    id: string
): Promise<BlogPost | undefined> => {
    try {
        const docRef = doc(db, POSTS_COLLECTION, id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) return undefined
        return { id: docSnap.id, ...(docSnap.data() as Omit<BlogPost, 'id'>) }
    } catch (error) {
        console.error('Error getting post by id:', error)
        return undefined
    }
}

export const createPost = async (
    post: Omit<BlogPost, 'id' | 'published_at'>
) => {
    try {
        const newPost = {
            ...post,
            published_at: new Date().toISOString(),
        }
        const docRef = await addDoc(collection(db, POSTS_COLLECTION), newPost)
        return docRef.id
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
}

export const updatePost = async (id: string, post: Partial<BlogPost>) => {
    try {
        const docRef = doc(db, POSTS_COLLECTION, id)
        await updateDoc(docRef, post)
    } catch (error) {
        console.error('Error updating post:', error)
        throw error
    }
}

export const deletePost = async (id: string) => {
    try {
        const docRef = doc(db, POSTS_COLLECTION, id)
        await deleteDoc(docRef)
    } catch (error) {
        console.error('Error deleting post:', error)
        throw error
    }
}
