import mongoose from "mongoose";

const quickStyleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("QuickStyle", quickStyleSchema);
