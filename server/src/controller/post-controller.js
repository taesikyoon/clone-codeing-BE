import PostService from "../services/post-service.js";
class PostController {
  postService = new PostService();
  createpost = async (req, res, next) => {
    const { content, image } = req.body;

    if (!content || !image) throw Error("Error no item");

    try {
      await this.postService.createpost(content, image);
      res
        .status(200)
        .json({ sucess: true, message: "게시글이 작성되었습니다." });
    } catch (err) {
      res
        .status(400)
        .json({ sucess: false, message: "게시글 작성에 실패했습니다." });
    }
  };
}
export default PostController;
