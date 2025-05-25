import express from "express";
import { getAllRevenueTrend, getRevenueTrendByMonthYear, createRevenueTrend, updateRevenueTrend, deleteRevenueTrend} from "../controllers/revenueTrendController.js";


const router = express.Router();

// Rute untuk mendapatkan data revenue trend
router.get("/", getAllRevenueTrend); 
router.get("/:month/:year", getRevenueTrendByMonthYear);
router.post("/", createRevenueTrend);
router.put("/", updateRevenueTrend);
router.delete("/:id", deleteRevenueTrend);


export default router;
