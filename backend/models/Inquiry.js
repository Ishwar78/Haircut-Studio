import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);