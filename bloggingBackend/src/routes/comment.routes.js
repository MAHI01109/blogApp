import express from "express";
import {
  getcomments,
  postComment,
  postCommentReply,
} from "../controllers/comments.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/post_comment").post(isAuthenticated, postComment);
router.route("/post_comment/reply_comment").post(isAuthenticated,postCommentReply);

router.route("/get_comments/:blog_id").get(getcomments);
export default router;
