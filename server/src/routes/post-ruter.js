import express, { application } from "express";
import PostController from "../controller/post-controller.js";
import authMiddlewares from "../middlewares/auth-middleware.js";
const router = express.Router();
const postController = new PostController();

router.use(authMiddlewares);

router.post("/create", postController.createpost);
router.get("/", postController.findAllPosts);
router.get("/:postId", postController.findOnePost);
router.put("/update/:postId", postController.updatepost);
router.delete("/delete/:postId", postController.deletepost);
router.post("/like/:postId", postController.likepost);
router.post("/unlike/:postId", postController.unlikepost);

export default router;
