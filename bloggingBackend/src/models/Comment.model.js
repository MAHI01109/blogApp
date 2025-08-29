import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const CommentLikeSchem = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const RepliesSchema = new Schema(
  {
    reply: { type: String, required: true },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [CommentLikeSchem],
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
