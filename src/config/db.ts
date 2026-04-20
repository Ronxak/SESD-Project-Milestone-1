import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed. Please start your local MongoDB server to use database features.");
    // Removed process.exit(1) to allow the health-check server to run.
  }
};
