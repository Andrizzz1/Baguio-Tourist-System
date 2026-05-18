import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});


export default async function handler(req, res) {
    const { postId } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }

    try {
        const result = await pool.query(
            `DELETE FROM community_posts
             WHERE post_id = $1 AND user_id = $2
             RETURNING *`,
            [postId, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Post not found or you are not allowed to delete this post"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
            deletedPost: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }



}