import fs from "fs";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import College from "../models/College.js";

dotenv.config();

const ncrAndUpDistricts = [
  "DELHI", "NEW DELHI", "GHAZIABAD", "GAUTAM BUDDHA NAGAR", "NOIDA", "GREATER NOIDA", 
  "LUCKNOW", "KANPUR", "PRAYAGRAJ", "ALLAHABAD", "VARANASI", "MEERUT", "AGRA", 
  "ALIGARH", "MORADABAD", "BAREILLY", "GORAKHPUR", "MATHURA", "SAHARANPUR",
  "GURUGRAM", "FARIDABAD", "BULANDSHAHR", "GHAZIPUR", "JAUNPUR", "AZAMGARH"
];

const seedMassiveData = async () => {
    try {
        console.log("Reading 39,000+ colleges dataset...");
        const rawData = fs.readFileSync("./seeds/dataset.json", "utf-8");
        const data = JSON.parse(rawData);
        
        // Filter strictly for districts in UP, Delhi, and NCR
        const filteredColleges = data.filter(c => {
            if (!c.district) return false;
            return ncrAndUpDistricts.some(d => c.district.toUpperCase().includes(d));
        });

        // Dedup by name to prevent spam
        const uniqueMap = new Map();
        filteredColleges.forEach(c => {
            if (!uniqueMap.has(c.institute_name)) {
                uniqueMap.set(c.institute_name, c);
            }
        });
        const uniqueColleges = Array.from(uniqueMap.values());

        console.log(`Found exactly ${uniqueColleges.length} unique colleges in UP and Delhi NCR!`);

        // Map them to NotesMate schema
        const finalColleges = uniqueColleges.map((c) => ({
            name: c.institute_name,
            city: c.district,
            state: "UP / Delhi NCR" 
        }));

        await connectDB();
        
        await College.deleteMany({});
        console.log("Database cleared...");

        await College.insertMany(finalColleges);
        
        console.log(`SUCCESS! Injected all ${finalColleges.length} colleges into MongoDB!`);
        process.exit(0);

    } catch (err) {
        console.error("Failed to seed massive dataset:", err);
        process.exit(1);
    }
}

seedMassiveData();
