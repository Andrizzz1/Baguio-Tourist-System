import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { userId, listOnly } = req.query;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        try {
            if (listOnly === "true") {
                const result = await pool.query(
                    `
                    SELECT spot_id
                    FROM visited_spots
                    WHERE user_id = $1
                    `,
                    [userId]
                );

                return res.status(200).json(result.rows);
            }

            const result = await pool.query(
                `
                SELECT COUNT(*) AS total_visited
                FROM visited_spots
                WHERE user_id = $1
                `,
                [userId]
            );

            return res.status(200).json({
                totalVisited: Number(result.rows[0].total_visited)
            });
        } catch (error) {
            console.log("Visited spots GET error:", error);
            return res.status(500).json({ error: error.message });
        }
    }

if (req.method === "POST") {
    const { user_id, spot_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }

    if (!spot_id) {
        return res.status(400).json({ error: "spot_id is required" });
    }

    try {
        const result = await pool.query(
            `
            INSERT INTO visited_spots (user_id, spot_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, spot_id) DO NOTHING
            RETURNING *
            `,
            [user_id, spot_id]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({
                message: "Spot already marked as visited"
            });
        }

        return res.status(201).json({
            message: "Spot marked as visited",
            visitedSpot: result.rows[0]
        });
    } catch (error) {
        console.log("Visited spots POST error:", error);
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
            DELETE FROM visited_spots
            WHERE user_id = $1 AND spot_id = $2
            RETURNING *
            `,
            [userId, spotId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Visited spot not found" });
        }

        return res.status(200).json({
            message: "Spot unmarked as visited",
            deletedVisitedSpot: result.rows[0]
        });
    } catch (error) {
        console.log("Visited spots DELETE error:", error);
        return res.status(500).json({ error: error.message });
    }
}

    return res.status(405).json({ error: "Method not allowed" });
}