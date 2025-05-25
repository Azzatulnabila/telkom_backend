import express from "express";
import cors from "cors";
import revenueTrendRoutes from "./routes/revenueTrendRoutes.js";
import revenueSegmentRoutes from "./routes/revenueSegmentRoutes.js";
import revenuePrognosaRoutes from "./routes/revenuePrognosaRoutes.js";
import revenueNgtmaRoutes from "./routes/revenueNgtmaRoutes.js";

import collectionAMRoutes from "./routes/collectionAMRoutes.js";
import collectionPelangganRoutes from "./routes/collectionPelangganRoutes.js";
import collectionSegmentRoutes from "./routes/collectionSegmentRoutes.js";

import salesCustomerRoutes from "./routes/salesCustomerRoutes.js";
import salesTunggakanCustRoutes from "./routes/salesTunggakanCustRoutes.js";

import db from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parsing JSON

app.use("/api/revenue-trend", revenueTrendRoutes);
app.use("/api/revenue-segment", revenueSegmentRoutes);
app.use("/api/revenue-prognosa", revenuePrognosaRoutes);
app.use("/api/revenue-ngtma", revenueNgtmaRoutes);

app.use("/api/collection-am", collectionAMRoutes);
app.use("/api/collection-pelanggan", collectionPelangganRoutes);
app.use("/api/collection-segment", collectionSegmentRoutes);

app.use("/api/sales-customer", salesCustomerRoutes);
app.use("/api/sales-tunggakan", salesTunggakanCustRoutes);

// Cek koneksi database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Routes
app.use("/api/revenue", revenueTrendRoutes);
app.use("/api/segment", revenueSegmentRoutes);
app.use("/api/prognosa", revenuePrognosaRoutes);
app.use("/api/ngtma", revenueNgtmaRoutes);

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

