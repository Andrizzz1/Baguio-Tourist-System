import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { userId } = req.query;
        //, countOnly
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        try {
            // if (countOnly === "true") {
            //     const result = await pool.query(
            //         `
            //         SELECT COUNT(*) AS total_itinerary
            //         FROM itinerary
            //         WHERE user_id = $1
            //         `,
            //         [userId]
            //     );

            //     return res.status(200).json({
            //         totalItinerary: Number(result.rows[0].total_itinerary)
            //     });
            // }

            const result = await pool.query(
                `
                SELECT *
                FROM itinerary
                WHERE user_id = $1
                ORDER BY added_at DESC
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
                INSERT INTO itinerary (
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
                return res.status(200).json({ message: "Spot already added to itinerary" });
            }

            return res.status(201).json({
                message: "Spot added to itinerary",
                itinerarySpot: result.rows[0]
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
                DELETE FROM itinerary
                WHERE user_id = $1 AND spot_id = $2
                RETURNING *
                `,
                [userId, spotId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Itinerary spot not found" });
            }

            return res.status(200).json({
                message: "Spot removed from itinerary",
                deletedSpot: result.rows[0]
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}