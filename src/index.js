import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Current directory:", process.cwd());
console.log("🔍 Looking for .env file...");

// Try different paths
const envPath = path.resolve(process.cwd(), '.env');
console.log("🔍 Expected .env path:", envPath);

// Check if file exists
import fs from "fs";
if (fs.existsSync(envPath)) {
  console.log("✅ .env file found!");
} else {
  console.log("❌ .env file NOT found at:", envPath);
}

// Load environment variables
dotenv.config({
  path: envPath
});

// Debug: Check if Cloudinary vars are loaded
console.log("🔍 After dotenv config:");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME || "UNDEFINED");
console.log("PORT:", process.env.PORT || "UNDEFINED");

import connectDB from "./db/db.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!!", err);
  });