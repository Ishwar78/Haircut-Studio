import mongoose from "mongoose";

const beforeAfterSchema = new mongoose.Schema({
  beforeImage: String,
  afterImage: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("BeforeAfter", beforeAfterSchema);