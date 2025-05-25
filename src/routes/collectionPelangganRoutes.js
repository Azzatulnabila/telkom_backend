import express from "express";
import { getAllNamaPelanggan, createNamaPelanggan } from "../controllers/collectionPelangganController.js";

const router = express.Router();

router.get("/", getAllNamaPelanggan);
router.post("/", createNamaPelanggan);

export default router;
