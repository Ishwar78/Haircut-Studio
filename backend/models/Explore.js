import mongoose from "mongoose";

const exploreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  length: { type: String, required: true },
  tag: { type: String, required: true },
  img: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Explore", exploreSchema);
