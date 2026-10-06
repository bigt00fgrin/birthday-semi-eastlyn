app.get("/api/rsvps", (req, res) => {
    const data = fs.readFileSync("data/rsvps.json", "utf8");
    const rsvps = JSON.parse(data);

    res.json(rsvps);
});