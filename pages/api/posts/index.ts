import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts, createPost } from 'lib/blogService'
import { verifyAuth } from 'lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const posts = await getAllPosts()
        res.status(200).json(posts)
    } else if (req.method === 'POST') {
        if (!await verifyAuth(req)) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        try {
            const { title, slug, description, content, tags, cover_image } = req.body
            const id = await createPost({ title, slug, description, content, tags, cover_image })
            res.status(201).json({ id, message: 'Post created' })
        } catch (error) {
            res.status(500).json({ error: 'Failed to create post' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
