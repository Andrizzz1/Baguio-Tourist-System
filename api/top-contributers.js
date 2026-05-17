import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})


export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const result = await pool.query(`
            SELECT	
                COUNT(community_posts.content) AS total_post,
                users.users_id,
                users.username
            FROM community_posts
            JOIN users on community_posts.user_id = users.users_id
            GROUP BY users.users_id, users.username
            ORDER BY total_post DESC  
            LIMIT 5;     
        `);

        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    }
    