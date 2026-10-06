const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve your website files
app.use(express.static("."));


// POST RSVP
app.post("/api/rsvp", (req, res) => {

    const { name, response, plus } = req.body;

    if (!name || !response) {
        return res.status(400).json({
            message: "Please provide your name and RSVP."
        });
    }

    if (response !== "yes" && response !== "no") {
        return res.status(400).json({
            message: "Invalid RSVP response."
        });
    }

    if (plus !== 0 && plus !== 1) {
        return res.status(400).json({
            message: "You can only bring 0 or 1 additional guest."
        });
    }

    const data = fs.readFileSync("data/rsvps.json", "utf8");
    const rsvps = JSON.parse(data);

    rsvps.push({
        name: name,
        response: response,
        plus: plus
    });

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


// GET RSVPs for host dashboard
app.get("/api/rsvps", (req, res) => {

    const data = fs.readFileSync("data/rsvps.json", "utf8");
    const rsvps = JSON.parse(data);

    res.json(rsvps);
});


app.listen(PORT, () => {
    console.log(`RSVP server running at http://localhost:${PORT}`);
});