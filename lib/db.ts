import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import path from 'path'

let db: Database | null = null

export const getDb = async () => {
    if (db) return db

    // ...

    db = await open({
        filename: path.join(process.cwd(), 'blog.sqlite'),
        driver: sqlite3.Database,
    })

    await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      content TEXT NOT NULL,
      tags TEXT,
      cover_image TEXT,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `)

    // Check if admin exists, if not create default
    const admin = await db.get('SELECT * FROM admin WHERE username = ?', 'admin')
    if (!admin) {
        // Default password is 'admin123' - hashed with bcrypt
        // We import bcrypt dynamically to avoid issues if it's not installed yet when this file is parsed initially, 
        // but since we installed it, it's fine. However, for db.ts which might be imported in API routes, 
        // let's do the hashing here or pre-calculate it.
        // $2a$10$X.w.j.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1 -> example
        // Let's use a pre-calculated hash for 'admin123' to avoid importing bcrypt in this file if possible, 
        // or just import it. Importing is better.
        const bcrypt = require('bcryptjs')
        const hash = await bcrypt.hash('admin123', 10)
        await db.run('INSERT INTO admin (username, password_hash) VALUES (?, ?)', 'admin', hash)
    }

    return db
}
