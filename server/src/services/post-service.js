import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

import { db } from "../models/index.js";

const Like = db.sequelize.models.Like;
// Like는 어떻게 불러오지?
class PostService {
  createpost = async (content, image, fk_user_id) => {
    const data = await Post.create({ content, image, fk_user_id });

    if (!data) {
      const error = new Error("게시글 작성 실패");
      error.status = 400;
      throw error;
    }
  };

  findAllPosts = async (id) => {
    const lists = await Post.findAll({
      // attributes: ["id", "content"],
      include: [
        { model: User, attributes: ["image", "nickname"] },
        { model: Comment },
        // { model: Like },
      ],
    });
    const likes = await Like.findAll({
      attributes: [
        "fk_post_id",
        "fk_user_id",
        [
          db.sequelize.fn("COUNT", db.sequelize.col("fk_user_id")),
          "count_islike",
        ],
      ],
      group: "fk_post_id",
      raw: true,
    });
    // return likes;
    // like 준비하기
    // const postlikes = db.sequelize.models.Like({ where: { fk_user_id } });
    return lists.map((list) => {
      const statuslike = likes[0]?.fk_user_id === id ? true : false;
      const cntlike =
        list?.id === likes[0]?.fk_post_id ? likes.shift().count_islike : 0;

      return {
        postId: list.id,
        content: list.content,
        postimg: list.image,
        createAt: list.createdAt,
        updatedAt: list.updatedAt,
        cntcomment: list.Comments.length,
        cntlike,
        statuslike,
        User: {
          userimage: list.User.image,
          nickname: list.User.nickname,
          // introduce,
          // email,
          // phone,
          // gender,
        },
      };
    });
  };

  findOnePost = async (id) => {
    const list = await Post.findOne({
      where: { id },
      include: [
        { model: User },
        {
          model: Comment,
          include: [{ model: User, attributes: ["nickname"] }],
        },
      ],
    });
    // return list;
    if (!list) {
      const error = new Error("게시글이 존재하지 않습니다.");
      error.status = 418;
      throw error;
    }
    const commentlists = list.Comments.map((comment) => {
      return {
        commentid: comment.id,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        nickname: comment.User.nickname,
        image: comment.User.image,
      };
    });
    const likelen = await Like.findAll({ where: { fk_post_id: id } });

    return {
      id: list.id,
      content: list.content,
      postimage: list.image,
      cntlike: likelen.length,
      PostingUser: {
        userId: list.User.id,
        userimage: list.User.image,
        nickname: list.User.nickname,
      },
      comments: commentlists,
    };
  };

  //
  //
  //
  //
  //   start
  updatepost = async (postId, content, image, userId) => {
    if (!image) {
      const error = new Error("이미지 등록은 필수 입니다.");
      error.status = 428;
      throw error;
    }
    // 유저 아이디 자기 아이디만 수정가능
    const existPost = await Post.findByPk(postId);
    if (!existPost) {
      const error = new Error("존재하지 않는 게시물");
      error.status = 400;
      throw error;
    }
    if (existPost.fk_user_id === userId) {
      await Post.update({ content, image }, { where: { id: postId } });
    } else {
      const error = new Error("자신의 게시글만 수정 가능합니다.");
      error.status = 409;
      throw error;
    }
  };

  deletepost = async (postId, userId) => {
    const existPost = await Post.findByPk(postId);

    if (!existPost) {
      const error = new Error("존재하지 않는 게시물");
      error.status = 400;
      throw error;
    }

    if (existPost.fk_user_id === userId)
      await Post.destroy({ where: { id: postId } });
    else {
      const error = new Error("자신의 게시글만 수정 가능합니다.");
      error.status = 409;
      throw error;
    }
  };

  likepost = async (fk_post_id, fk_user_id) => {
    // db.sequelize.models.Like({ where: { fk_user_id } });
    const existPost = await Post.findOne({
      where: { id: fk_post_id },
    });
    // 게시글 존재

    if (existPost) {
      const existLike = await existPost.getLiker({
        where: { id: fk_user_id },
      });
      if (existLike.length) {
        const error = new Error("두번 누를 수 없습니다.");
        error.status = 409;
        throw error;
      }
      await existPost.addLiker(fk_user_id);
    } else {
      const error = new Error("게시글이 존재하지 않습니다.");
      error.status = 400;
      throw error;
    }
  };

  unlikepost = async (fk_post_id, fk_user_id) => {
    const existPost = await Post.findOne({
      where: { id: fk_post_id },
    });

    if (existPost) {
      // 게시글 존재
      const existLike = await existPost.getLiker({
        where: { id: fk_user_id },
      });
      if (existLike.length !== 0) {
        await existPost.removeLiker(fk_user_id);
      } else {
        const error = new Error("좋아요 취소 됐다 고만 좀 누르라");
        error.status = 409;
        throw error;
      }
    } else {
      const error = new Error("게시글이 존재하지 않습니다.");
      error.status = 400;
      throw error;
    }
  };
}

export default PostService;
