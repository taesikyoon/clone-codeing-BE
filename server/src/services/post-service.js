import Post from "../models/post.js";

class PostService {
  createpost = async (content, image) => {
    const data = await Post.create({ content, image });

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
    console.log(list);
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
}

export default PostService;
