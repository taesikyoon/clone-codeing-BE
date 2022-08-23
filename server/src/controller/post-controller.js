import PostService from "../services/post-service.js";
class PostController {
  postService = new PostService();

  createpost = async (req, res, next) => {
    const { content } = req.body;
    const { location } = req.file;
    const { id } = res.locals;
    if (!location)
      // 인스타그램 content는 null 허용 수정 필요
      return res
        .status(409)
        .json({ sucess: false, message: "이미지 넣어주세요" });

    try {
      await this.postService.createpost(content, location, id);
      res
        .status(201)
        .json({ sucess: true, message: "게시글이 작성되었습니다." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  findAllPosts = async (req, res, next) => {
    try {
      const data = await this.postService.findAllPosts();

      return res
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
      return res
        .status(200)
        .json({ sucess: true, message: "상세 게시글 조회 성공.", data });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  updatepost = async (req, res, next) => {
    try {
      const { content, image } = req.body;
      const { postId } = req.params;
      const { id } = res.locals;

      await this.postService.updatepost(postId, content, image, id);
      return res
        .status(200)
        .json({ sucess: true, message: "게시글 수정 완료." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  deletepost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals;
      console.log(id);
      await this.postService.deletepost(postId, id);
      return res
        .status(200)
        .json({ sucess: true, message: "게시글 삭제 완료." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  likepost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals;
      await this.postService.likepost(postId, id);

      return res.status(200).json({ sucess: true, message: "좋아요 완료." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };

  unlikepost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { id } = res.locals;
      await this.postService.unlikepost(postId, id);

      return res
        .status(200)
        .json({ sucess: true, message: "좋아요 취소 완료." });
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
export default PostController;
