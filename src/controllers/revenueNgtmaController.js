import db from "../config/db.js";

// Ambil semua data dari revenue_NGTMA
export const getAllRevenueNGTMA = (req, res) => {
    db.query("SELECT * FROM revenue_NGTMA", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const getRevenueNgtmaByMonthYear = (req, res) => {
    const { month, year } = req.params;
    db.query(
        "SELECT * FROM revenue_ngtma WHERE month = ? AND year = ?",
        [month, year],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};


// Tambah data ke revenue_NGTMA
export const createRevenueNGTMA = (req, res) => {
    const { segment, ogp_order, ogp_price, mtd_tgt, mtd_billcomp_order, mtd_billcomp_price, mtd_ach, gmom, ytd_tgt, ytd_billcomp_order, ytd_billcomp_price, ytd_ach, gytd } = req.body;

    if (!segment) {
        return res.status(400).json({ message: "Segment harus diisi!" });
    }

    db.query(
        "INSERT INTO revenue_NGTMA (segment, ogp_order, ogp_price, mtd_tgt, mtd_billcomp_order, mtd_billcomp_price, mtd_ach, gmom, ytd_tgt, ytd_billcomp_order, ytd_billcomp_price, ytd_ach, gytd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [segment, ogp_order || 0, ogp_price || 0.00, mtd_tgt || 0.00, mtd_billcomp_order || 0, mtd_billcomp_price || 0.00, mtd_ach || '0%', gmom || '0%', ytd_tgt || 0.00, ytd_billcomp_order || 0, ytd_billcomp_price || 0.00, ytd_ach || '0%', gytd || '0%'],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data inserted successfully!", id: result.insertId });
        }
    );
};

// Update data revenue_NGTMA berdasarkan ID
export const updateRevenueNGTMA = (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ message: "Data harus dalam format array!" });
    }

    const updateQuery = `
        UPDATE revenue_NGTMA 
        SET 
            ogp_order = ?, ogp_price = ?, mtd_tgt = ?, mtd_billcomp_order = ?, 
            mtd_billcomp_price = ?, mtd_ach = ?, gmom = ?, ytd_tgt = ?, 
            ytd_billcomp_order = ?, ytd_billcomp_price = ?, ytd_ach = ?, gytd = ? 
        WHERE segment = ?
    `;

    const updatePromises = data.map((item) => {
        return new Promise((resolve, reject) => {
            const values = [
                item.ogp_order, item.ogp_price, item.mtd_tgt, item.mtd_billcomp_order,
                item.mtd_billcomp_price, item.mtd_ach, item.gmom, item.ytd_tgt,
                item.ytd_billcomp_order, item.ytd_billcomp_price, item.ytd_ach, item.gytd,
                item.segment
            ];

            db.query(updateQuery, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });

    Promise.all(updatePromises)
        .then(() => {
            // Ambil semua data setelah update
            db.query("SELECT * FROM revenue_NGTMA", (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Data berhasil diperbarui!", data: results });
            });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
};


// Hapus data revenue_NGTMA berdasarkan ID
export const deleteRevenueNGTMA = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM revenue_NGTMA WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
};
