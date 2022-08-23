import path from "path";
import multerS3 from "multer-s3";
import multer from "multer";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const s3 = new aws.S3();

const userimage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "insta-amazing-clone/User Image",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
const postimage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "insta-amazing-clone/Post Image",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
export { userimage, postimage };
