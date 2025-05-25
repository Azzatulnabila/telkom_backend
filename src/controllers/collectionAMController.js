import db from "../config/db.js";

export const getAllCollectionAM = (req, res) => {
  db.query('SELECT * FROM collection_AM', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const createCollectionAM = (req, res) => {
  const { nama_am, collected, target, segment } = req.body;
  const sql = 'INSERT INTO collection_AM (nama_am, collected, target, segment) VALUES (?, ?, ?, ?)';
  db.query(sql, [nama_am, collected, target, segment], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Data AM berhasil ditambahkan', id: result.insertId });
  });
};
