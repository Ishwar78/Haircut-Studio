import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    // status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);