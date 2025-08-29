import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }
);

const Like = new mongoose.model("Like", likeSchema);

export default Like;