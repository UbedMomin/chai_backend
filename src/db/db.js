// src/db/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connection string:", process.env.MONGODB_URI);
    
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `\n✅ MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("❌ MONGODB connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;