import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { username, email, provider } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0];

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.users_id,
                    username: user.username,
                    email: user.email,
                    provider: provider || "google"
                }
            });
        }

        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [username || "Google User", email, "GOOGLE_AUTH_USER"]
        );

        const user = newUser.rows[0];

        return res.status(201).json({
            message: "Account created",
            user: {
                id: user.users_id,
                username: user.username,
                email: user.email,
                provider: provider || "google"
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}