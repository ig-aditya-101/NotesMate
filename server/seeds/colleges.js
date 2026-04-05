import dotenv from "dotenv";
import connectDB from "../config/db.js";
import College from "../models/college.js";
dotenv.config();

const colleges = [
  { name: "ITM", city: "delhi", state: "delhi" },

  { name: "MAIT", city: "gorakhpur", state: "uttar pradesh" },
  { name: "HMR", city: "delhi", state: "delhi" },
];

const seedData = async () => {
  try {
    await connectDB();
    await College.insertMany(colleges);
    console.log("Colleges seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
