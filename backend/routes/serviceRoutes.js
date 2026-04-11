import express from "express";
import {
  createService,
  getServices,
  getAllServicesAdmin,
  updateService,
  deleteService
} from "../controllers/serviceController.js";

const router = express.Router();

// USER
router.get("/", getServices);

// ADMIN
router.get("/admin", getAllServicesAdmin);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;