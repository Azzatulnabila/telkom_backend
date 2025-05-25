import express from "express";
import { getAllSegments } from "../controllers/collectionSegmentController.js";

const router = express.Router();

router.get("/", getAllSegments);

export default router;
