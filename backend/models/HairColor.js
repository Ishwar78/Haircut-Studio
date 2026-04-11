import mongoose from "mongoose";

const hairColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true } // Hex code like #1a1a1a
}, { timestamps: true });

export default mongoose.model("HairColor", hairColorSchema);
