import { from } from 'rxjs';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const dynamicCloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    public_id: (req, file) => `candidate_photos/${file.originalname}`,
  },
});
