import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding");

    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const newAdmin = new Admin({
        email: "admin@gmail.com",
        password: "123456", // In a real app, use bcrypt
      });
      await newAdmin.save();
      console.log("Admin created successfully: admin@gmail.com / 123456");
    }

    mongoose.disconnect();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedAdmin();
