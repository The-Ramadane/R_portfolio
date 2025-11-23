import { getDb } from './db'

export type BlogPost = {
    id: number
    title: string
    slug: string
    description: string
    content: string
    tags: string
    cover_image: string
    published_at: string
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
    const db = await getDb()
    return db.all('SELECT * FROM posts ORDER BY published_at DESC')
}

export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
    const db = await getDb()
    return db.get('SELECT * FROM posts WHERE slug = ?', slug)
}

export const getPostById = async (id: number): Promise<BlogPost | undefined> => {
    const db = await getDb()
    return db.get('SELECT * FROM posts WHERE id = ?', id)
}

export const createPost = async (post: Omit<BlogPost, 'id' | 'published_at'>) => {
    const db = await getDb()
    const result = await db.run(
        'INSERT INTO posts (title, slug, description, content, tags, cover_image) VALUES (?, ?, ?, ?, ?, ?)',
        post.title,
        post.slug,
        post.description,
        post.content,
        post.tags,
        post.cover_image
    )
    return result.lastID
}

export const updatePost = async (id: number, post: Partial<BlogPost>) => {
    const db = await getDb()
    // This is a simplified update, ideally we construct the query dynamically based on fields
    await db.run(
        `UPDATE posts SET 
      title = COALESCE(?, title), 
      slug = COALESCE(?, slug), 
      description = COALESCE(?, description), 
      content = COALESCE(?, content), 
      tags = COALESCE(?, tags), 
      cover_image = COALESCE(?, cover_image) 
    WHERE id = ?`,
        post.title,
        post.slug,
        post.description,
        post.content,
        post.tags,
        post.cover_image,
        id
    )
}

export const deletePost = async (id: number) => {
    const db = await getDb()
    await db.run('DELETE FROM posts WHERE id = ?', id)
}
