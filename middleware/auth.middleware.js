const db = require("../database/db");

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send({ error: "Authorization token is required" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).send({ error: "Invalid authorization format" });
    }

    const sessionId = parts[1];

    if (!req.session || !req.sessionStore) {  // Ensure session is initialized
        return res.status(500).send({ error: "Session store not initialized" });
    }

    req.sessionStore.get(sessionId, (err, session) => {
        if (err) {
            console.error("Error retrieving session:", err);
            return res.status(500).send({ error: "Internal server error" });
        }

        if (!session || !session.user || !session.user.email) { 
            return res.status(401).send({ error: "Invalid session or session expired" });
        }
        
        // Validate user existence
        const query = "SELECT id FROM users WHERE email = ?";
        db.query(query, [session.user.email], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send({ error: "Failed to verify user" });
            }

            if (results.length === 0) {
                return res.status(401).send({ error: "User not found" });
            }

            // Attach user data to req.user for downstream use
            req.user = { id: results[0].id, email: session.user.email };
            next();
        });
    });
};

module.exports = { isAuthenticated };
