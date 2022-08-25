import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const createComment = async (req, res, next) => {
  const comment = req.body.comment;
  const userId = res.locals.id;
  const postId = parseInt(req.params.postId);
  if (!userId || !postId || !comment) {
    return res.status(400).json({
      success: false,
      message: "user 아이디나 post 아이디나 comment가없어요.",
    });
  }
  try {
    const post = await Post.findOne({ where: { id: postId }});
    if (post === null) {
      return res.status(400).json({
        success: false,
        message: `${postId}번 게시글이 존재하지않아요.`
      });
    }
    const create = await Comment.create({
      comment,
      fk_user_id: userId,
      fk_post_id: postId,
    });
    if (!create) {
      return res.status(400).json({
        success: false,
        message: "작성 실패",
      });
    }
    return res.status(201).json({
      success: true,
      message: "작성 성공",
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const deleteComment = async (req, res, next) => {
  const userId = res.locals.id;
  const commentId = parseInt(req.params.commentId);
  if (!commentId || !userId) {
    return res.status(400).json({
      success: false,
      message: "user 아이디나 comment 아이디가없어요.",
    });
  }
  try {
    const result = await Comment.findOne({ where: { id: commentId }});
    if (!result || result.fk_user_id !== userId) {
      return res.status(400).json({
        success: false,
        message: "comment 존재하지않거나 내 comment 아닙니다.",
      });
    }
    const remove = await Comment.destroy({ where: { id: commentId }});
    if (!remove) {
      return res.status(400).json({
        success: false,
        message: "삭제 실패",
      });
    }
    return res.status(200).json({
      success: false,
      message: "삭제 성공",
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const updateComment = async (req, res, next) => {
  const comment = req.body.comment;
  const userId = res.locals.id;
  const commentId = parseInt(req.params.commentId);
  if (!commentId || !userId) {
    return res.status(400).json({
      success: false,
      message: "user 아이디나 comment 아이디가없어요.",
    });
  }
  try {
    const result = await Comment.findOne({ where: { id: commentId }});
    if (!result || result.fk_user_id !== userId) {
      return res.status(400).json({
        success: false,
        message: "comment 존재하지않거나 내 comment 아닙니다.",
      });
    }
    const update = await Comment.update({ comment }, { where: { id: commentId }});
    if (!update) {
      return res.status(400).json({
        success: false,
        message: "업데이트 실패",
      });
    }
    return res.status(200).json({
      success: true,
      message: "업데이트 성공",
    });
  } catch (err) {
    console.error(err);
    return next(err);
  } 
};  

const likeComment = async (req, res, next) => {
  const userId = res.locals.id;
  const commentId = parseInt(req.params.commentId);
  if (!userId || !commentId) {
    return res.status(400).json({
      success: false,
      message: "user 아이디나 comment 아이디가 없어요.",
    });
  }
  try {
    const comment = await Comment.findOne({ where: { id: commentId }});
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "comment가 없어요.",
      });
    }
    await comment.addLiker(userId);
    return res.status(201).json({
      success: true,
      message: `${commentId}번 comment 좋아요 성공`,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const unLikeComment = async (req, res, next) => {
  const userId = res.locals.id;
  const commentId = parseInt(req.params.commentId);
  if (!userId || !commentId) {
    return res.status(400).json({
      success: false,
      message: "user 아이디나 comment 아이디가 없어요.",
    });
  }
  try {
    const comment = await Comment.findOne({ where: { id: commentId }});
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "comment가 없어요.",
      });
    }
    await comment.removeLiker(userId);
    return res.status(201).json({
      success: true,
      message: `${commentId}번 comment 좋아요 취소 성공`,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export {
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  unLikeComment,
};