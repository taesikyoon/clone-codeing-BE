import express from "express";

import * as commentController from "../controller/comment-controller.js";

import verify from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create/:postId", verify, commentController.createComment);
router.put("/like/:commentId", verify, commentController.likeComment);
router.delete("/unlike/:commentId", verify, commentController.unLikeComment);
router.delete("/:commentId", verify, commentController.deleteComment);
router.put("/:commentId", verify, commentController.updateComment);

export default router;