import express, { application } from "express";
import PostController from "../controller/post-controller.js";
import authMiddlewares from "../middlewares/auth-middleware.js";
import { userimage, postimage } from "../middlewares/s3-middleware.js";
const router = express.Router();
const postController = new PostController();

router.use(authMiddlewares);

router.post("/create", postimage.single("postImg"), postController.createpost);
router.get("/", postController.findAllPosts);
router.get("/:postId", postController.findOnePost);
router.put(
  "/update/:postId",
  postimage.single("postImg"),
  postController.updatepost
);
router.delete("/delete/:postId", postController.deletepost);
router.post("/like/:postId", postController.likepost);
router.post("/unlike/:postId", postController.unlikepost);
// image.upload.single("키값 뭐로주는지") ,
export default router;
