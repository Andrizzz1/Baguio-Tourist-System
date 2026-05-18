import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        const result = await pool.query(`
            SELECT content
            FROM community_posts
            WHERE created_at >= NOW() - INTERVAL '7 days'
        `);

        const counts = {};

        result.rows.forEach((row) => {
            const hashtags = row.content?.match(/#[A-Za-z0-9_]+/g) || [];

            hashtags.forEach((tag) => {
                const cleanTag = tag.toLowerCase();
                counts[cleanTag] = (counts[cleanTag] || 0) + 1;
            });
        });

        const trends = Object.entries(counts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        res.json(trends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}