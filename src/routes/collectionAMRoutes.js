import express from "express";
import { getAllCollectionAM, createCollectionAM } from "../controllers/collectionAMController.js";

const router = express.Router();

router.get("/", getAllCollectionAM);
router.post("/", createCollectionAM);

export default router;
