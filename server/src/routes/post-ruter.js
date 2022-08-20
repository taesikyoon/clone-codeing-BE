import express from "express";
import PostController from "../controller/post-controller.js";
const router = express.Router();
const postController = new PostController();

router.post("/create", postController.createpost);
router.get("/", postController.findAllPosts);
router.get("/:postId", postController.findOnePost);

export default router;
