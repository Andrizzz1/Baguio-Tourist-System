import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const result = await pool.query(
            "SELECT COUNT(*) AS total_members FROM users"
        );

        res.status(200).json({
            totalMembers: Number(result.rows[0].total_members),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}