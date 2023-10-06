import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    postId: {
        type: String,
        required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
