import Comment from "../models/Comment.model.js";

export async function postComment(req, res) {
  const userId = req?.session?.passport?.user;
  console.log(userId);

  const { comment, blog_id } = req.body;
  console.log(req.body);
  if (!comment || !blog_id) {
    return res.status(400).json({ message: "Fields are missing" });
  }

  try {
    const response = await Comment.create({
      content: comment,
      blog: blog_id,
      owner: userId,
    });

    return res
      .status(201)
      .json({ message: "comment added successfully", response });
  } catch (error) {
    console.log(error, "somthing went wrong");
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
}

export async function postCommentReply(req, res) {
  const userId = req?.session?.passport?.user;
  const { reply, comment_id } = req.body;
  console.log(comment_id, reply);
  if (!comment_id || !reply) return new Error("field are messing");
  try {
    const response = await Comment.find({ _id: comment_id });
    if (!response) {
      return new Error("invalid comment_id");
    }
    const addCommentReply = await Comment.updateOne(
      { _id: comment_id },
      {
        $push: {
          replies: {
            reply: reply,
            commentId: comment_id,
            owner: userId,
          },
        },
      }
    );
    console.log(addCommentReply);
    if (!addCommentReply) {
      return new Error("invalid commnet");
    }
    const postedreply = await Comment.find({ _id: comment_id });

    console.log(postedreply);
  } catch (error) {
    console.log(error, "somthing went wrong");
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
}

export async function getcomments(req, res) {
  const blog_id = req.params.blog_id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  // console.log(blog_id);

  if (!blog_id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    const total = await Comment.countDocuments({ blog: blog_id });
    const comments = await Comment.find({ blog: blog_id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "owner", select: "username profileImage" });

    res.status(200).json({
      comments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.log(error, "something went wrong");
    res.status(500).json({
      message: "Something went wrong. Try again.",
    });
  }
}
