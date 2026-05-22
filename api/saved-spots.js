import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        try {
            const result = await pool.query(
                `
                SELECT *
                FROM saved_spots
                WHERE user_id = $1
                ORDER BY saved_at DESC
                `,
                [userId]
            );

            return res.status(200).json(result.rows);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === "POST") {
        const {
            user_id,
            spot_id,
            spot_name,
            spot_location,
            spot_rating,
            spot_badge,
            spot_hours,
            spot_entry,
            spot_description,
            spot_about,
            spot_highlights,
            spot_image
        } = req.body;

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        if (!spot_id || !spot_name) {
            return res.status(400).json({ error: "spot_id and spot_name are required" });
        }

        try {
            const result = await pool.query(
                `
                INSERT INTO saved_spots (
                    user_id,
                    spot_id,
                    spot_name,
                    spot_location,
                    spot_rating,
                    spot_badge,
                    spot_hours,
                    spot_entry,
                    spot_description,
                    spot_about,
                    spot_highlights,
                    spot_image
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                ON CONFLICT (user_id, spot_id) DO NOTHING
                RETURNING *
                `,
                [
                    user_id,
                    spot_id,
                    spot_name,
                    spot_location,
                    spot_rating,
                    spot_badge,
                    spot_hours,
                    spot_entry,
                    spot_description,
                    spot_about,
                    spot_highlights,
                    spot_image
                ]
            );

            if (result.rows.length === 0) {
                return res.status(200).json({ message: "Spot already saved" });
            }

            return res.status(201).json({
                message: "Spot saved successfully",
                savedSpot: result.rows[0]
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === "DELETE") {
        const { userId, spotId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        if (!spotId) {
            return res.status(400).json({ error: "spotId is required" });
        }

        try {
            const result = await pool.query(
                `
                DELETE FROM saved_spots
                WHERE user_id = $1 AND spot_id = $2
                RETURNING *
                `,
                [userId, spotId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Saved spot not found" });
            }

            return res.status(200).json({
                message: "Spot removed from saved",
                deletedSpot: result.rows[0]
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}