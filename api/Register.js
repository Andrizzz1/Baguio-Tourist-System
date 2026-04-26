import pkg from 'pg'
import bcrypt from 'bcrypt'
const { Pool } = pkg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})


export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const { email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        )
        res.status(201).json({ user: result.rows[0] })
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exists' })
        } else {
            res.status(500).json({ error: error.message })
            
        }
    }
}