import Reply from "../models/Reply.model.js";

export async function postReply(req, res) {
  const userId = req?.session?.passport?.user;
  const { commentId, parentReplyId, content } = req.body;
  if (!commentId || !content) {
    return res.status(400).json({ message: "Fields are missing" });
  }
  try {
    const reply = await Reply.create({
      comment: commentId,
      parentReply: parentReplyId || null,
      owner: userId,
      content,
    });
    res.status(201).json({ message: "Reply added", reply });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}


export async function getReplies(req, res) {
  const { commentId, parentReplyId, page = 1, limit = 5 } = req.query;
  const filter = { comment: commentId, parentReply: parentReplyId || null };
  try {
    const replies = await Reply.find(filter)
      .populate({ path: "owner", select: "username profileImage" })
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json({ replies });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}