import type { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from 'lib/db'
import bcrypt from 'bcryptjs'
import { signToken } from 'lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' })
    }

    const db = await getDb()
    const admin = await db.get('SELECT * FROM admin WHERE username = ?', username)

    if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, admin.password_hash)

    if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = signToken({ id: admin.id, username: admin.username })

    res.status(200).json({ token })
}
