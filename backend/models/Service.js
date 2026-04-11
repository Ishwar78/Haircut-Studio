import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,

  category: {
    type: String,
    enum: ["salon", "studio"],
    required: true
  },

  image: String,

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);