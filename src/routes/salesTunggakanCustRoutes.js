import express from "express";
import {getAllTunggakan, createTunggakan, deleteTunggakan} from "../controllers/salesTunggakanCustController.js";

const router = express.Router();

router.get("/", getAllTunggakan);          
router.post("/", createTunggakan);         
router.delete("/:id", deleteTunggakan);     

export default router;
