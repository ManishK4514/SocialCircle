import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createComment = async (req, res) => {
    try {
        const { postId, userId, description } = req.body;
        const user = await User.findById(userId);
        const newComment = new Comment({
            postId,
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            likes: {},
        });
        await newComment.save();

        const comment = await Comment.find();
        res.status(201).json(comment);
    } catch (err) {
        console.log("Error creating Comment!");
        console.log(err);
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getPostComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId: postId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likeComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Comment.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE COMMENT */
export const updateComment = async (req, res) => {
    let { _id } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: _id },
            req.body
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


/* DELETE COMMENT */
export const deleteComment = async (req, res) => {
    let { _id } = req.body;

    try {
        await Comment.findByIdAndDelete(
            { _id: _id }
        );
        res.status(200).json({message: "Comment Deleted..."});
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
