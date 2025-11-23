import type { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from 'lib/db'
import bcrypt from 'bcryptjs'
import { verifyAuth } from 'lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    if (!verifyAuth(req)) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { oldPassword, newPassword } = req.body

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old and new passwords are required' })
    }

    const db = await getDb()
    // Assuming single admin user for now, or extract user ID from token if we decoded it in verifyAuth
    // For simplicity, let's just get the admin user 'admin'
    const admin = await db.get('SELECT * FROM admin WHERE username = ?', 'admin')

    if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' })
    }

    const isValid = await bcrypt.compare(oldPassword, admin.password_hash)

    if (!isValid) {
        return res.status(401).json({ error: 'Invalid old password' })
    }

    const hash = await bcrypt.hash(newPassword, 10)
    await db.run('UPDATE admin SET password_hash = ? WHERE username = ?', hash, 'admin')

    res.status(200).json({ message: 'Password updated successfully' })
}
