const { promisePool } = require("../database/db");

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send({ error: "Authorization token is required" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).send({ error: "Invalid authorization format" });
    }

    const sessionId = parts[1];

    if (!req.session || !req.sessionStore) {
        return res.status(500).send({ error: "Session store not initialized" });
    }

    req.sessionStore.get(sessionId, async (err, session) => {
        if (err) {
            console.error("Error retrieving session:", err);
            return res.status(500).send({ error: "Internal server error" });
        }

        if (!session || !session.user || !session.user.email) {
            return res.status(401).send({ error: "Invalid session or session expired" });
        }

        try {
            const query = "SELECT id FROM users WHERE email = ?";
            const [results] = await promisePool.query(query, [session.user.email]);

            if (results.length === 0) {
                return res.status(401).send({ error: "User not found" });
            }

            req.user = { id: results[0].id, email: session.user.email };
            next();
        } catch (error) {
            console.error("Database error:", error);
            return res.status(500).send({ error: "Failed to verify user" });
        }
    });
};

module.exports = { isAuthenticated };
