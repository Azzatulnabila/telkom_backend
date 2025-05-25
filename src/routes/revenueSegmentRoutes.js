import express from "express";
import { getAllRevenueSegmen1, getRevenueSegmen1ByMonthYear, createRevenueSegmen1, updateRevenueSegmen1, deleteRevenueSegmen1, 
    getAllRevenueSegmen2, createRevenueSegmen2, updateRevenueSegmen2, deleteRevenueSegmen2} from "../controllers/revenueSegmentController.js";

const router = express.Router();
    router.get("/segmen1", getAllRevenueSegmen1);
    router.get("/segmen1/:month/:year", getRevenueSegmen1ByMonthYear);
    router.post("/segmen1", createRevenueSegmen1);
    router.put("/segmen1/:id", updateRevenueSegmen1);
    router.delete("/segmen1/:id", deleteRevenueSegmen1);
    
    router.get("/segmen2", getAllRevenueSegmen2);
    router.post("/segmen2", createRevenueSegmen2);
    router.put("/segmen2", updateRevenueSegmen2);
    router.delete("/segmen2/:id", deleteRevenueSegmen2);
    
export default router;