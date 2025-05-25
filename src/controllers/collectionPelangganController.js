import db from "../config/db.js";

export const getAllNamaPelanggan = (req, res) => {
  db.query('SELECT * FROM collection_pelanggan', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const createNamaPelanggan = (req, res) => {
  const { nama_pelanggan, target, collected, segment } = req.body;
  const sql = 'INSERT INTO collection_pelanggan (nama_pelanggan, target, collected, segment) VALUES (?, ?, ?, ?)';
  db.query(sql, [nama_pelanggan, target, collected, segment], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Pelanggan berhasil ditambahkan', id: result.insertId });
  });
};
