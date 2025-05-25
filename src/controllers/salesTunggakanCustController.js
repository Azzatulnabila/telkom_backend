import db from "../config/db.js";

// Ambil semua data tunggakan
export const getAllTunggakan = (req, res) => {
    db.query("SELECT * FROM tunggakan_cust", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Tambah data tunggakan
export const createTunggakan = (req, res) => {
    const { ubis, witel, am, nama_pelanggan, partner, cr, saldo_tagihan } = req.body;
    if (!ubis || !witel || !partner || cr == null || !saldo_tagihan)
        return res.status(400).json({ message: "Field wajib diisi!" });

    db.query(
        `INSERT INTO tunggakan_cust (ubis, witel, am, nama_pelanggan, partner, cr, saldo_tagihan)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [ubis, witel, am, nama_pelanggan, partner, cr, saldo_tagihan],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data tunggakan berhasil ditambahkan!", insertedId: result.insertId });
        }
    );
};

// Hapus data tunggakan berdasarkan ID
export const deleteTunggakan = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tunggakan_cust WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data tunggakan berhasil dihapus!" });
    });
};

// Ambil tunggakan berdasarkan partner
export const getTunggakanByPartner = (req, res) => {
    const { partner } = req.params;
    db.query("SELECT * FROM tunggakan_cust WHERE partner = ?", [partner], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(results);
    });
};
