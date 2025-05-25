import db from "../config/db.js";

// Ambil semua data customer
export const getAllCustomers = (req, res) => {
    db.query("SELECT * FROM customer", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Ambil customer berdasarkan partner
export const getCustomerByPartner = (req, res) => {
    const { partner } = req.params;
    db.query("SELECT * FROM customer WHERE partner = ?", [partner], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Customer tidak ditemukan" });
        res.json(results);
    });
};

// Tambah data customer
export const createCustomer = (req, res) => {
    const { ubis, witel, am, nama_pelanggan, partner, cr, cyc_bill } = req.body;
    if (!ubis || !witel || !am || !nama_pelanggan || !partner || cr == null || !cyc_bill)
        return res.status(400).json({ message: "Field tidak boleh kosong!" });

    db.query(
        `INSERT INTO customer (ubis, witel, am, nama_pelanggan, partner, cr, cyc_bill)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [ubis, witel, am, nama_pelanggan, partner, cr, cyc_bill],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Customer berhasil ditambahkan!", insertedId: result.insertId });
        }
    );
};

// Hapus customer berdasarkan ID
export const deleteCustomer = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM customer WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer berhasil dihapus!" });
    });
};
