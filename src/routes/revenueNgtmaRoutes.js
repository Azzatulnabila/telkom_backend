import express from "express";
import { getAllRevenueNGTMA, getRevenueNgtmaByMonthYear, createRevenueNGTMA, updateRevenueNGTMA, deleteRevenueNGTMA} from "../controllers/revenueNgtmaController.js";

const router = express.Router();
    router.get("/", getAllRevenueNGTMA);
    router.get("/:month/:year", getRevenueNgtmaByMonthYear);
    router.post("/", createRevenueNGTMA);
    router.put("/", updateRevenueNGTMA);
    router.delete("/:id", deleteRevenueNGTMA);
    
export default router;