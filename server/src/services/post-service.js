import Post from "../models/post.js";
// Like는 어떻게 불러오지?
class PostService {
  createpost = async (content, image) => {
    const data = await Post.create({ content, image, fk_user_id });

    if (!data) {
      const error = new Error("게시글 작성 실패");
      error.status = 400;
      throw error;
    }
  };

  findAllPosts = async () => {
    const lists = await Post.findAll({});

    return lists.map((list) => {
      return {
        id: list.id,
        content: list.content,
        image: list.image,
        userId: "userId가져올예정",
        commentCnt: "comment가져올예정",
        postlikes: "postlikes가져올예정",
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
    const existPost = await Post.findOne({ where: { id, fk_user_id } });
    await existPost.liker({ fk_user_id });
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
