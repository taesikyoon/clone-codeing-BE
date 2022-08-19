import Post from "../models/post.js";

class PostService {
  createpost = async (content, image) => {
    const data = await Post.create({ content, image });

    if (data) return true;
    else throw Error(false);
  };
}

export default PostService;
