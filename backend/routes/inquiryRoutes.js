import express from "express";
const router = express.Router();

import {
  createInquiry,
  getAllInquiry,
  deleteInquiry
} from "../controllers/inquiryController.js";

router.post("/create", createInquiry);
router.get("/all", getAllInquiry);
router.delete("/delete/:id", deleteInquiry);

export default router;