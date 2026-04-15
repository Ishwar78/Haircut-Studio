import express from "express";
import {
  createBeforeAfter,
  getBeforeAfter,
  getAllBeforeAfter,
  deleteBeforeAfter
} from "../controllers/beforeAfterController.js";

const router = express.Router();

// USER
router.get("/", getBeforeAfter);

// ADMIN
router.get("/admin", getAllBeforeAfter);

// CREATE
router.post("/", createBeforeAfter);

// DELETE
router.delete("/:id", deleteBeforeAfter);

export default router;