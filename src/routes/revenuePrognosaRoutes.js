import express from "express";
import { getAllRevenuePrognosaMtd, createRevenuePrognosaMtd, updateRevenuePrognosaMtd, deleteRevenuePrognosaMtd, 
    getAllRevenuePrognosaYtd, createRevenuePrognosaYtd, updateRevenuePrognosaYtd, deleteRevenuePrognosaYtd} from "../controllers/revenuePrognosaController.js";

const router = express.Router();
    router.get("/prognosaMtd", getAllRevenuePrognosaMtd);
    router.post("/prognosaMtd", createRevenuePrognosaMtd);
    router.put("/prognosaMtd", updateRevenuePrognosaMtd);
    router.delete("/prognosaMtd/:id", deleteRevenuePrognosaMtd);
    
    router.get("/prognosaYtd", getAllRevenuePrognosaYtd);
    router.post("/prognosaYtd", createRevenuePrognosaYtd);
    router.put("/prognosaYtd", updateRevenuePrognosaYtd);
    router.delete("/prognosaYtd/:id", deleteRevenuePrognosaYtd);
    
export default router;