import express from "express";
import {
  createBeforeAfter,
  getBeforeAfter,
  getAllBeforeAfter,
  deleteBeforeAfter,
  upload
} from "../controllers/beforeAfterController.js";

const router = express.Router();

// USER
router.get("/", getBeforeAfter);

// ADMIN
router.get("/admin", getAllBeforeAfter);

// CREATE
router.post("/", upload.fields([{ name: 'beforeImage', maxCount: 1 }, { name: 'afterImage', maxCount: 1 }]), createBeforeAfter);

// DELETE
router.delete("/:id", deleteBeforeAfter);

export default router;