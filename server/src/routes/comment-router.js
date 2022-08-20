import express from "express";

import * as commentController from "../controller/comment-controller.js";

import verify from "../middlewares/auth-middleware.js";

const router = express.Router();

router.post("/create/:postId", verify, commentController.createComment);
router.delete("/:commentId", commentController.deleteComment);
router.put("/:commentId", commentController.updateComment);

export default router;