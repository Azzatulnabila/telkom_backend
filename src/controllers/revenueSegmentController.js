import db from "../config/db.js";

// Ambil semua data dari revenue_segmen_1
export const getAllRevenueSegmen1 = (req, res) => {
    db.query("SELECT * FROM revenue_segmen_1", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Ambil data berdasarkan bulan dan tahun
export const getRevenueSegmen1ByMonthYear = (req, res) => {
    const { month, year } = req.params;
    db.query(
        "SELECT * FROM revenue_trend WHERE month = ? AND year = ?",
        [month, year],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// Tambah data ke revenue_segmen_1
export const createRevenueSegmen1 = (req, res) => {
    const { month, year, data } = req.body; 

    // Validasi field tidak kosong
    if (!month || !year || !data || data.length !== 3) {
        return res.status(400).json({ message: "Data harus berisi tiga set untuk DGS, DPS, dan DSS!" });
    }

    const segments = ["DGS", "DPS", "DSS"];
    const values = data.map((item, index) => [segments[index], month, year, item.percentage, item.tgt, item.rev]);

    // Cek apakah kombinasi bulan dan tahun sudah ada
    const checkQuery = `
        SELECT COUNT(*) AS count FROM revenue_segmen_1 
        WHERE month = ? AND year = ? 
    `;

    db.query(checkQuery, [month, year], (err, results) => {
        if (err) return res.status(500).json({ error: "Terjadi kesalahan saat memeriksa data!" });

        if (results[0].count > 0) {
            return res.status(400).json({ message: "GAGAL: Data untuk bulan dan tahun ini sudah ada!" });
        } 

        // Insert data baru jika tidak ada duplikasi
        const insertQuery = `
            INSERT INTO revenue_segmen_1 (segment, month, year, percentage, tgt, rev) 
            VALUES ?
        `;

        db.query(insertQuery, [values], (err, result) => {
            if (err) return res.status(500).json({ error: "Terjadi kesalahan saat menyimpan data!" });

            res.json({ message: "BERHASIL: Data berhasil ditambahkan!", insertedRows: result.affectedRows });
        });
    });
};

// Update data revenue_segmen_1
export const updateRevenueSegmen1 = (req, res) => {
    const { id } = req.params;
    const { segment, jan_percentage, jan_tgt, jan_rev } = req.body;
    db.query(
        "UPDATE revenue_segmen_1 SET segment=?, jan_percentage=?, jan_tgt=?, jan_rev=? WHERE id=?",
        [segment, jan_percentage, jan_tgt, jan_rev, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data updated successfully!" });
        }
    );
};

// Hapus data revenue_segmen_1
export const deleteRevenueSegmen1 = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM revenue_segmen_1 WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
};

// Ambil semua data dari revenue_segmen_2
export const getAllRevenueSegmen2 = (req, res) => {
    db.query("SELECT * FROM revenue_segmen_2", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Tambah data ke revenue_segmen_2
export const createRevenueSegmen2 = (req, res) => {
    const { data } = req.body;

    // Validasi data harus berisi tiga set untuk DGS, DSS, dan DPS
    if (!data || data.length !== 3) {
        return res.status(400).json({ message: "Data harus berisi tiga set untuk DGS, DSS, dan DPS!" });
    }

    const segments = ["DGS", "DSS", "DPS"];
    const values = data.map((item, index) => [segments[index], item.mtd_tgt, item.mtd_real, item.mtd_ach, item.gmom, item.ytd_tgt, item.ytd_real, item.ytd_ach, item.gyoy]);

    const insertQuery = `
        INSERT INTO revenue_segmen_2 (segment, mtd_tgt, mtd_real, mtd_ach, gmom, ytd_tgt, ytd_real, ytd_ach, gyoy)
        VALUES ?
    `;

    db.query(insertQuery, [values], (err, result) => {
        if (err) return res.status(500).json({ error: "Terjadi kesalahan saat menyimpan data!" });

        res.json({ message: "Data berhasil ditambahkan!", insertedRows: result.affectedRows });
    });
};

// Update data revenue_segmen_2 
export const updateRevenueSegmen2 = (req, res) => {
    const { data } = req.body;

    // Validasi data input
    if (!data || data.length !== 3) {
        return res.status(400).json({ message: "Data harus berisi tiga set data untuk DGS, DPS, dan DSS!" });
    }

    const segments = ["DGS", "DPS", "DSS"];

    // Query untuk menampilkan data sebelum update
    const selectQuery = "SELECT * FROM revenue_segmen_2 WHERE segment IN (?, ?, ?)";

    db.query(selectQuery, segments, (err, existingData) => {
        if (err) return res.status(500).json({ error: err.message });
        if (existingData.length === 0) return res.status(404).json({ error: "Data tidak ditemukan!" });

        // Kirim data sebelum update untuk ditampilkan di frontend
        res.json({ message: "Data sebelum update:", data: existingData });

        // Proses update data setelah menampilkan data sebelumnya
        let updateCases = "";
        let updateValues = [];

        // Kolom yang akan diupdate
        const columns = ["mtd_tgt", "mtd_real", "mtd_ach", "gmom", "ytd_tgt", "ytd_real", "ytd_ach", "gyoy"];

        columns.forEach((column) => {
            updateCases += `${column} = CASE segment `;
            segments.forEach((seg, index) => {
                updateCases += `WHEN '${seg}' THEN ? `;
                updateValues.push(data[index][column]);
            });
            updateCases += "END, ";
        });

        updateCases = updateCases.slice(0, -2); // Hapus koma terakhir

        const updateQuery = `
            UPDATE revenue_segmen_2 
            SET ${updateCases} 
            WHERE segment IN (?, ?, ?)
        `;

        updateValues.push(...segments);

        db.query(updateQuery, updateValues, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Data tidak ditemukan untuk di-update!" });
            console.log("Data berhasil diperbarui!");
        });
    });
};


// Hapus data revenue_segmen_2
export const deleteRevenueSegmen2 = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM revenue_segmen_2 WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
};
