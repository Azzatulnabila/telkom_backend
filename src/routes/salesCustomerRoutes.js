import express from "express";
import {getAllCustomers, createCustomer, deleteCustomer} from "../controllers/salesCustomerController.js";

const router = express.Router();

router.get("/", getAllCustomers);               
router.post("/", createCustomer);             
router.delete("/:id", deleteCustomer);      

export default router;
