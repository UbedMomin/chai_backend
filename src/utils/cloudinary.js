import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ TEMPORARY: Use hardcoded values to test
const cloudinaryConfig = {
  cloud_name: "dqpylldvn",
  api_key: "148516334485458",
  api_secret: "xNCsd1W-WV46QzzNOh0Xu9Zvl3o"
};

console.log("🔍 Using Cloudinary Config (hardcoded):", cloudinaryConfig.cloud_name);

cloudinary.config(cloudinaryConfig);

console.log("✅ Cloudinary configured successfully");

// Upload File
const uploadOnCloudinary = async (localFilePath, folder = "uploads") => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder,
    });

    // FIX: Remove duplicate fs.unlinkSync and check if file exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("✅ Uploaded and local file deleted:", result.secure_url);
    } else {
      console.log("✅ Uploaded (local file already removed):", result.secure_url);
    }
    
    return result;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    // FIX: Only try to delete if file exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

// Delete File
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("🗑️ Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary Delete Error:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };