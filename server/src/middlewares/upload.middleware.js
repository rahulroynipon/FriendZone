import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadAndProcessImages = async (req, res, next) => {
  try {
    const uploadToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const type = file.mimetype.startsWith("image/") ? "image" : "video";
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve({ url: result.secure_url, type });
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const uploadPromises = req.files.map(uploadToCloudinary);
    const uploadedMedia = await Promise.all(uploadPromises);

    req.uploadedMedia = uploadedMedia;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { upload, uploadAndProcessImages };
