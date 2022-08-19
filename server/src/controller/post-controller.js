import PostService from "../services/post-service.js";
class PostController {
  postService = new PostService();

  createpost = async (req, res, next) => {
    const { content, image } = req.body;

    if (!content || !image)
      // 인스타그램 content는 null 허용 수정 필요
      res.status(409).json({ sucess: false, message: "이미지 넣어주세요" });

    try {
      await this.postService.createpost(content, image);
      res
        .status(200)
        .json({ sucess: true, message: "게시글이 작성되었습니다." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  findAllPosts = async (req, res, next) => {
    try {
      const data = await this.postService.findAllPosts();

      res
        .status(200)
        .json({ sucess: true, message: "전체 게시글 조회 성공.", data });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  findOnePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const data = await this.postService.findOnePost(postId);
      res
        .status(200)
        .json({ sucess: true, message: "상세 게시글 조회 성공.", data });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
export default PostController;
