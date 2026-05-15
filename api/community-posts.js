import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

export default async function handler(req, res) {
    if (req.method === "GET") {
            try {
                const result = await pool.query(`
                    SELECT
                        community_posts.post_id,
                        community_posts.content,
                        community_posts.location,
                        community_posts.image_url,
                        community_posts.created_at,
                        users.users_id,
                        users.username,
                        users.email
                    FROM community_posts
                    JOIN users on community_posts.user_id = users.users_id
                    ORDER BY community_posts.created_at DESC        
                `);

               return res.status(200).json(result.rows);
            } catch (error) {
               return res.status(500).json({ error: error.message });
            }
        }

    if (req.method == "POST") {
        const { user_id, content, location, image_url } = req.body;
        if(!user_id){
            return res.status(400).json({ error: "user_id is required" });
        }
        
        try {
            const result = await pool.query(
                "INSERT INTO community_posts (user_id, content, location, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
                [user_id, content, location, image_url]
            );
            return res.status(201).json(result.rows[0]);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
     return res.status(405).json({ error: "Method not allowed" });
}

