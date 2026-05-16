import pkg from 'pg'
import bcrypt from 'bcrypt'

const { Pool } = pkg

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { email, password } = req.body

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Email not found' })
        }

        const user = result.rows[0]
        const isMatch = await bcrypt.compare(password, user.password_hash)

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' })
        }

        return res.json({
            message: 'Login successful',
            user: {
                id: user.users_id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        return res.status(500).json({ error: 'Login failed' })
    }
}