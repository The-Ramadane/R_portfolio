import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostById, updatePost, deletePost } from 'lib/blogService'
import { verifyAuth } from 'lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query
    const postId = Number(id)

    if (req.method === 'GET') {
        const post = await getPostById(postId)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ error: 'Post not found' })
        }
    } else if (req.method === 'PUT') {
        if (!verifyAuth(req)) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        try {
            await updatePost(postId, req.body)
            res.status(200).json({ message: 'Post updated' })
        } catch (error) {
            res.status(500).json({ error: 'Failed to update post' })
        }
    } else if (req.method === 'DELETE') {
        if (!verifyAuth(req)) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        try {
            await deletePost(postId)
            res.status(200).json({ message: 'Post deleted' })
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete post' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
