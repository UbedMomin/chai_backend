import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload File
const uploadOnCloudinary = async (localFilePath, folder = "uploads") => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder, // ✅ saves inside specific folder
    });

    fs.unlinkSync(localFilePath); // delete after upload
    console.log("✅ Uploaded:", result.secure_url);

    return result;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);

    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
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
