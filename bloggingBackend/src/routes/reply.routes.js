import express from "express";
import { postReply, getReplies } from "../controllers/replies.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/post_reply", isAuthenticated, postReply);
router.get("/get_replies", getReplies);

export default router;
