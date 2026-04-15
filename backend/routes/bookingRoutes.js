import express from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBookingStatus,
  getBookingById,
} from "../controllers/bookingController.js";

const router = express.Router();

// ✅ CREATE
router.post("/", createBooking);

// ✅ GET ALL
router.get("/all", getAllBookings);

// ✅ DELETE
router.delete("/delete/:id", deleteBooking);

// ✅ UPDATE STATUS
router.put("/status/:id", updateBookingStatus);

// ✅ GET SINGLE
router.get("/:id", getBookingById);

export default router;