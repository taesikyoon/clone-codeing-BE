import Comment from "../models/comment.js";

const createComment = async (req, res, next) => {
  const comment = req.body.comment;
  const userId = req.user.id;
  const postId = req.params.postId;
  if (!userId || !postId || !comment) {
    return res.status(400).json({
      success: false,
      message: "user 아이디나 post 아이디나 comment가없어요.",
    });
  }
  try { 
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
  const userId = req.user.id;
  const commentId = req.params.commentId;
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
  const userId = req.user.id;
  const commentId = req.params.commentId;
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

export {
  createComment,
  deleteComment,
  updateComment,
};