import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    parentReply: { type: Schema.Types.ObjectId, ref: "Reply", default: null }, // for nested replies
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);
export default Reply;
