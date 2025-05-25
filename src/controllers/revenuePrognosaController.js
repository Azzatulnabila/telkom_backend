import db from "../config/db.js";

// Ambil semua data dari revenue_prognosa
export const getAllRevenuePrognosaMtd = (req, res) => {
    db.query("SELECT * FROM revenue_prognosa_Mtd", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Tambah data ke revenue_prognosa
export const createRevenuePrognosaMtd = (req, res) => {
    const { segment, prognosa_tgt, prognosa_real, prognosa_ach } = req.body;

    // Cek apakah ada data yang kosong
    if (!segment || !prognosa_tgt || !prognosa_real || !prognosa_ach) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    db.query(
        "INSERT INTO revenue_prognosa (segment, prognosa_tgt, prognosa_real, prognosa_ach) VALUES (?, ?, ?, ?, ?, ?)",
        [segment, prognosa_tgt, prognosa_real, prognosa_ach],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data inserted successfully!", id: result.insertId });
        }
    );
};

// Update data revenue_prognosa
export const updateRevenuePrognosaMtd = (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ message: "Data harus dalam format array!" });
    }

    const updateQuery = `
        UPDATE revenue_prognosa_mtd 
        SET 
            beforeOGP_target = ?, beforeOGP_estSust = ?, beforeOGP_billComp = ?, beforeOGP_ol = ?, 
            beforeOGP_ach = ?, needScaling = ?, afterOGP_pbAso = ?, afterOGP_inProg = ?, 
            afterOGP_failed = ?, afterOGP_ol = ?, afterOGP_ach = ?, afterOGP_gmom = ?, needScalingAfter = ? 
        WHERE witel = ?
    `;

    const updatePromises = data.map((item) => {
        return new Promise((resolve, reject) => {
            const values = [
                item.beforeOGP_target, item.beforeOGP_estSust, item.beforeOGP_billComp, item.beforeOGP_ol,
                item.beforeOGP_ach, item.needScaling, item.afterOGP_pbAso, item.afterOGP_inProg,
                item.afterOGP_failed, item.afterOGP_ol, item.afterOGP_ach, item.afterOGP_gmom, item.needScalingAfter,
                item.witel
            ];

            db.query(updateQuery, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });

    Promise.all(updatePromises)
        .then(() => res.json({ message: "Data berhasil diperbarui!" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};




// Hapus data revenue_prognosa
export const deleteRevenuePrognosaMtd = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM revenue_prognosa WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
};

// Ambil semua data dari revenue_prognosa
export const getAllRevenuePrognosaYtd = (req, res) => {
    db.query("SELECT * FROM revenue_prognosa_Ytd", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


// Tambah data ke revenue_prognosa
export const createRevenuePrognosaYtd = (req, res) => {
    const { segment, prognosa_tgt, prognosa_real, prognosa_ach } = req.body;

    // Cek apakah ada data yang kosong
    if (!segment || !prognosa_tgt || !prognosa_real || !prognosa_ach) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    db.query(
        "INSERT INTO revenue_prognosa (segment, prognosa_tgt, prognosa_real, prognosa_ach) VALUES (?, ?, ?, ?, ?, ?)",
        [segment, prognosa_tgt, prognosa_real, prognosa_ach],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data inserted successfully!", id: result.insertId });
        }
    );
};

// Update data revenue_prognosa
export const updateRevenuePrognosaYtd = (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ message: "Data harus dalam format array!" });
    }

    const updateQuery = `
        UPDATE revenue_prognosa_ytd 
        SET 
            beforeOGP_target = ?, beforeOGP_estSust = ?, beforeOGP_billComp = ?, beforeOGP_ol = ?, 
            beforeOGP_ach = ?, needScaling = ?, afterOGP_pbAso = ?, afterOGP_inProg = ?, 
            afterOGP_failed = ?, afterOGP_ol = ?, afterOGP_ach = ?, afterOGP_gyoy = ?, needScalingAfter = ? 
        WHERE witel = ?
    `;

    const updatePromises = data.map((item) => {
        return new Promise((resolve, reject) => {
            const values = [
                item.beforeOGP_target, item.beforeOGP_estSust, item.beforeOGP_billComp, item.beforeOGP_ol,
                item.beforeOGP_ach, item.needScaling, item.afterOGP_pbAso, item.afterOGP_inProg,
                item.afterOGP_failed, item.afterOGP_ol, item.afterOGP_ach, item.afterOGP_gyoy, item.needScalingAfter,
                item.witel
            ];

            db.query(updateQuery, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });

    Promise.all(updatePromises)
        .then(() => res.json({ message: "Data berhasil diperbarui!" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};



// Hapus data revenue_prognosa
export const deleteRevenuePrognosaYtd = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM revenue_prognosa WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
};