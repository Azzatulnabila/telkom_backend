import db from "../config/db.js";

// Ambil semua data revenue trend
export const getAllRevenueTrend = (req, res) => {
    db.query("SELECT * FROM revenue_trend", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Ambil data berdasarkan bulan dan tahun
export const getRevenueTrendByMonthYear = (req, res) => {
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

// Tambah data revenue trend baru
export const createRevenueTrend = (req, res) => {
    const { month, year, data } = req.body; 

    // Validasi field tidak kosong
    if (!month || !year || !data || data.length !== 3) {
        return res.status(400).json({ message: "Data harus berisi tiga set untuk DGS, DPS, dan DSS!" });
    }

    const segments = ["DGS", "DPS", "DSS"];
    const values = data.map((item, index) => [segments[index], month, year, item.percentage, item.tgt, item.rev]);

    // Cek apakah kombinasi bulan dan tahun sudah ada
    const checkQuery = `
        SELECT COUNT(*) AS count FROM revenue_trend 
        WHERE month = ? AND year = ? 
    `;

    db.query(checkQuery, [month, year], (err, results) => {
        if (err) return res.status(500).json({ error: "Terjadi kesalahan saat memeriksa data!" });

        if (results[0].count > 0) {
            // Jika data dengan bulan dan tahun tersebut sudah ada
            return res.status(400).json({ message: "GAGAL: Data untuk bulan dan tahun ini sudah ada!" });
        } 

        // Jika tidak ada duplikasi, lanjutkan insert data baru
        const insertQuery = `
            INSERT INTO revenue_trend (segment, month, year, percentage, tgt, rev) 
            VALUES ?
        `;

        db.query(insertQuery, [values], (err, result) => {
            if (err) return res.status(500).json({ error: "Terjadi kesalahan saat menyimpan data!" });

            res.json({ message: "BERHASIL: Data berhasil ditambahkan!", insertedRows: result.affectedRows });
        });
    });
};



export const updateRevenueTrend = (req, res) => {
    const { month, year, data } = req.body;

    // Validasi data input
    if (!month || !year || !data || data.length !== 3) {
        return res.status(400).json({ message: "Data harus berisi tiga set untuk DGS, DPS, dan DSS!" });
    }

    const segments = ["DGS", "DPS", "DSS"];
    
    // Query untuk menampilkan data sebelum update
    const selectQuery = `
        SELECT * FROM revenue_trend 
        WHERE month = ? AND year = ?
    `;

    db.query(selectQuery, [month, year], (err, existingData) => {
        if (err) return res.status(500).json({ error: err.message });
        if (existingData.length === 0) return res.status(404).json({ error: "Data tidak ditemukan!" });
        
        // Kirim data sebelum update untuk ditampilkan di frontend
        res.json({ message: "Data sebelum update:", existingData });

        // Proses update data setelah menampilkan data sebelumnya
        let updateCases = "";
        let updateValues = [];
        
        ["percentage", "tgt", "rev"].forEach((column) => {
            updateCases += `${column} = CASE segment `;
            segments.forEach((seg, index) => {
                updateCases += `WHEN '${seg}' THEN ? `;
                updateValues.push(data[index][column]);
            });
            updateCases += "END, ";
        });

        updateCases = updateCases.slice(0, -2); 

        const updateQuery = `
            UPDATE revenue_trend 
            SET ${updateCases}
            WHERE month = ? AND year = ?
        `;

        updateValues.push(month, year);

        db.query(updateQuery, updateValues, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Data tidak ditemukan!" });
            console.log("Data berhasil diperbarui!");
        });
    });
};



// Hapus data revenue trend
export const deleteRevenueTrend = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM revenue_trend WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data deleted successfully!" });
    });
};
