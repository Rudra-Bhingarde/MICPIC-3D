const { Client } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Rudra@22",
    database: "Micpic"
});

con.connect().then(() => console.log("Connected to DB")).catch(err => console.error("Connection error:", err));

// Fetch data based on highest preference
app.get("/getdata", async (req, res) => {
    const { tablename, objx, objxid } = req.query;

    if (!tablename || !objx || !objxid) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    let objy = tablename.startsWith(objx) ? tablename.slice(4) : tablename.slice(0, 4);

    const query = `
        SELECT "${objy}" AS objx, preference
        FROM "${tablename}"
        WHERE "${objx}" = $1
        AND preference = (SELECT MAX(preference) FROM "${tablename}" WHERE "${objx}" = $1);
    `;

    try {
        const result = await con.query(query, [objxid]);
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// Update preference value
app.put("/updateData", async (req, res) => {
    const { tablename, objx, objy, objxval, objyval, prefval } = req.body;

    if (!tablename || !objx || !objy || !objxval || !objyval || !prefval) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    const updateQuery = `
        UPDATE "${tablename}"
        SET preference = preference + $1
        WHERE "${objx}" = $2 AND "${objy}" = $3 
        RETURNING *;
    `;

    try {
        const result = await con.query(updateQuery, [prefval, objxval, objyval]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No matching record found" });
        }

        res.json({ message: "Preference updated successfully", updatedRow: result.rows });
    } catch (err) {
        console.error("Database error:", err.message); 
        res.status(500).json({ error: "Database update failed", details: err.message });
    }
});
app.put("/updateDatastep2", async (req, res) => {
    const { tablename, objx, objy, objxval, objyval, prefval } = req.body;

    if (!tablename || !objx || !objy || !objxval || !objyval || !prefval) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    // Function to generate nearby values
    function generateNearbyValues(baseValue) {
        return [
            baseValue + 1, baseValue + 10, baseValue + 100,
            baseValue - 1, baseValue - 10, baseValue - 100,
            baseValue + 11, baseValue + 101, baseValue + 110,
            baseValue - 11, baseValue - 110, baseValue - 101,
            baseValue + 111, baseValue - 111,baseValue
        ];
    }
    console.log(generateNearbyValues(objxval));
    console.log(generateNearbyValues(objyval));

    // Compute nearby values for objx and objy
    const objxValues = generateNearbyValues(objxval);
    const objyValues = generateNearbyValues(objyval);

    const updateQuery = `
        UPDATE "${tablename}"
        SET preference = preference + $1
        WHERE "${objx}" = ANY($2) 
        AND "${objy}" = ANY($3);
    `;

    try {
        const result = await con.query(updateQuery, [prefval, objxValues, objyValues]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No matching record found" });
        }

        res.json({ message: "Preference updated successfully", updatedRows: result.rowCount });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: "Database update failed", details: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
