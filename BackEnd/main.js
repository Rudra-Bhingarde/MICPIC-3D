const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Rudra@22",
  database: "Micpic",
});

// Connect to the database
con.connect().then(() => console.log("Connected to PostgreSQL")).catch(err => console.error("Connection error", err));

app.get("/getdata", async (req, res) => {
  try {
    const { tablename, objx, objxid } = req.query; // Use query params instead of body
    if (!tablename || !objx || !objxid) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    let objy = "";
    if (tablename.slice(0, 4) === objx) {
      objy = tablename.slice(4);
    } else {
      objy = tablename.slice(0, 4);
    }

    const query = `
      SELECT ${objy}, preference
      FROM ${tablename}
      WHERE ${objx} = $1 
      AND preference = (SELECT MAX(preference) FROM ${tablename} WHERE ${objx} = $1);
    `;

    const result = await con.query(query, [objxid]);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
