import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}) 

export default async function handler(req, res){
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }


    const { userId } = req.query;

    try{
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
                WHERE community_posts.user_id = $1
                ORDER BY community_posts.created_at DESC   
            `,[userId]);
        
        return res.status(200).json(result.rows);
    }catch{
        return res.status(500).json({ error: error.message });
    }

}