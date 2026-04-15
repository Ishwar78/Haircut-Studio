import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import tryNowRoutes from "./routes/tryNowRoutes.js";
import beforeAfterRoutes from "./routes/beforeAfterRoutes.js"
// import serviceRoutes from "./routes/serviceRoutes.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/try-now", tryNowRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/before-after",beforeAfterRoutes)

const PORT = process.env.PORT || 5000;

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
