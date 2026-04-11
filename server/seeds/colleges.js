import dotenv from "dotenv";
import connectDB from "../config/db.js";
import College from "../models/college.js";

dotenv.config();

const colleges = [
  // Delhi NCR
  { name: "IIT Delhi - Indian Institute of Technology", city: "New Delhi", state: "Delhi" },
  { name: "DTU - Delhi Technological University", city: "New Delhi", state: "Delhi" },
  { name: "NSUT - Netaji Subhas University of Technology", city: "New Delhi", state: "Delhi" },
  { name: "NIT Delhi - National Institute of Technology", city: "New Delhi", state: "Delhi" },
  { name: "IIIT Delhi - Indraprastha Institute of Information Technology", city: "New Delhi", state: "Delhi" },
  { name: "MAIT - Maharaja Agrasen Institute of Technology", city: "New Delhi", state: "Delhi" },
  { name: "MSIT - Maharaja Surajmal Institute of Technology", city: "New Delhi", state: "Delhi" },
  { name: "BVP - Bharati Vidyapeeth's College of Engineering", city: "New Delhi", state: "Delhi" },
  { name: "BPIT - Bhagwan Parshuram Institute of Technology", city: "New Delhi", state: "Delhi" },
  { name: "Delhi University (DU) - Main Campus", city: "New Delhi", state: "Delhi" },

  // Uttar Pradesh
  { name: "IIT Kanpur - Indian Institute of Technology", city: "Kanpur", state: "Uttar Pradesh" },
  { name: "IIT BHU - Indian Institute of Technology", city: "Varanasi", state: "Uttar Pradesh" },
  { name: "MNNIT - Motilal Nehru National Institute of Technology", city: "Prayagraj", state: "Uttar Pradesh" },
  { name: "IIIT Allahabad - Indian Institute of Information Technology", city: "Prayagraj", state: "Uttar Pradesh" },
  { name: "JSS Academy of Technical Education", city: "Noida", state: "Uttar Pradesh" },
  { name: "AKGEC - Ajay Kumar Garg Engineering College", city: "Ghaziabad", state: "Uttar Pradesh" },
  { name: "KIET Group of Institutions", city: "Ghaziabad", state: "Uttar Pradesh" },
  { name: "Amity University", city: "Noida", state: "Uttar Pradesh" },
  { name: "Shiv Nadar University", city: "Greater Noida", state: "Uttar Pradesh" },
  { name: "Gautam Buddha University", city: "Greater Noida", state: "Uttar Pradesh" }
];

const seedData = async () => {
  try {
    await connectDB();
    await College.deleteMany({});
    console.log("Database cleared.");
    await College.insertMany(colleges);
    console.log(`Success! Inserted ${colleges.length} real colleges into the Database!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
