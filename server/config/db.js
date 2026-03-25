import mongoose from "mongoose";
const connectDB = () => {
    // Add this line temporarily to see exactly what is being passed
    console.log("Connecting to:", process.env.MONGODB_URI); 

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MONGODB CONNECTION ERROR:", err));
};

export default connectDB