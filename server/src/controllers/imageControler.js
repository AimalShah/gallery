import Image from "../models/imageModel.js";
import S3Service from "../service/s3Service.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const s3 = new S3Service(
  process.env.REGION,
  process.env.S3_ACCESS_KEY,
  process.env.S3_SECRET_KEY,
  process.env.S3_BUCKET_NAME
);

const imageUpload = async (req, res) => {
  const file = req.file;
  const token = req.query.localStorageData;
  const data = jwt.decode(token);

  if (file) {

    const ImageData = await Image.create({
      imageName: file.originalname,
      uploadUser: data.id,
    });

    const upload = await s3.uploadImageToS3(file);
    return res.json("Image Uploaded Successfully" );
  }

  if (!file) {
    return res.json({ err: "Error can not upload Image" });
  }
};

export { imageUpload };
