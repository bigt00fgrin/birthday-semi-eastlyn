const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Allow the server to read JSON from requests
app.use(express.json());

// Serve your frontend files
app.use(express.static("public"));

// RSVP endpoint
app.post("/api/rsvp", (req, res) => {

    const { name, response, plus } = req.body;

    // Basic validation
    if (!name || !response) {
        return res.status(400).json({
            message: "Please provide your name and RSVP."
        });
    }

    // Only allow yes/no
    if (response !== "yes" && response !== "no") {
        return res.status(400).json({
            message: "Invalid RSVP response."
        });
    }

    // Only allow 0 or 1 additional guest
    if (plus !== 0 && plus !== 1) {
        return res.status(400).json({
            message: "You can only bring 0 or 1 additional guest."
        });
    }

    // Read existing RSVPs
    const data = fs.readFileSync("data/rsvps.json", "utf8");
    const rsvps = JSON.parse(data);

    // Add new RSVP
    rsvps.push({
        name: name,
        response: response,
        plus: plus
    });

    // Save RSVPs
    fs.writeFileSync(
        "data/rsvps.json",
        JSON.stringify(rsvps, null, 2)
    );

    res.json({
        message: response === "yes"
            ? `Love youuuu ${name} ♡`
            : `Love youuuu anyway ${name} ♡`
    });
});


app.get("/api/rsvps", (req, res) => {

    const data = fs.readFileSync("data/rsvps.json", "utf8");

    const rsvps = JSON.parse(data);

    res.json(rsvps);
});

// Start server
app.listen(PORT, () => {
    console.log(`RSVP server running at http://localhost:${PORT}`);
});