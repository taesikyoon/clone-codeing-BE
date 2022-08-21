import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

import { db } from "../models/index.js";
// Like는 어떻게 불러오지?
class PostService {
  createpost = async (content, image, fk_user_id, nickname) => {
    const data = await Post.create({ content, image, fk_user_id });

    if (!data) {
      const error = new Error("게시글 작성 실패");
      error.status = 400;
      throw error;
    }
  };

  findAllPosts = async () => {
    const lists = await Post.findAll({
      // attributes: ["id", "content"],
      include: [
        { model: User, attributes: ["image", "nickname"] },
        {
          model: Comment,
          // attributes: [
          //   [db.sequelize.fn("COUNT", db.sequelize.col("fk_post_id")), "Cnt"],
          // ],
        },
      ],
      // include: [{ model: Comment }],
    });
    // return lists;

    // like 준비하기
    // const postlikes = db.sequelize.models.Like({ where: { fk_user_id } });
    return lists.map((list) => {
      return {
        postId: list.id,
        content: list.content,
        postimg: list.image,
        createAt: list.createAt,
        updatedAt: list.updatedAt,
        cntcomment: list.Comments.length,
        User: {
          userimage: list.User.image,
          nickname: list.User.nickname,
        },
      };
    });
  };

  findOnePost = async (id) => {
    const list = await Post.findOne({ where: { id } });

    if (!list) {
      const error = new Error("게시글이 존재하지 않습니다.");
      error.status = 418;
      throw error;
    }
    return {
      id: list.id,
      content: list.content,
      image: list.image,
      userId: "userId가져올예정",
      commentCnt: "comment가져올예정",
      postlikes: "postlikes가져올예정",
    };
  };

  //
  //
  //
  //
  //   start
  updatepost = async (id, content, image) => {
    if (0 === id) {
      const error = new Error("없는 게시물 입니다.");
      error.status = 409;
      throw error;
    }

    if (!image) {
      const error = new Error("이미지 등록은 필수 입니다.");
      error.status = 428;
      throw error;
    }
    // 유저 아이디
    const result = await Post.update({ content, image }, { where: { id } });
  };

  deletepost = async (id) => {
    if (0 === id) {
      const error = new Error("없는 게시물 입니다.");
      error.status = 409;
      throw error;
    }

    const existPost = await Post.findByPk(id);

    if (existPost) await Post.destroy({ where: { id } });
    else {
      const error = new Error("없는 게시물 입니다.");
      error.status = 409;
      throw error;
    }
  };

  likepost = async (id, fk_user_id) => {
    if (0 === id) {
      const error = new Error("없는 게시물 입니다.");
      error.status = 409;
      throw error;
    }
    // db.sequelize.models.Like({ where: { fk_user_id } });
    const existPost = await Post.findByPk(id);
    console.log(existPost);
    await existPost.addLiker(fk_user_id);
  };

  unlikepost = async (id, userId) => {
    if (0 === id) {
      const error = new Error("없는 게시물 입니다.");
      error.status = 409;
      throw error;
    }
    await Like.destroy({ where: { id, userId } });
  };
}

export default PostService;
