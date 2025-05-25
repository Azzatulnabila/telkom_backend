import db from "../config/db.js";

export const getAllSegments = (req, res) => {
  db.query('SELECT * FROM segment', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
