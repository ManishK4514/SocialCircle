import express from "express";
import { createComment, getPostComments, likeComment, updateComment, deleteComment } from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:postId", verifyToken, getPostComments);
router.post("/:postId/create", verifyToken, createComment);

/* UPDATE */
router.patch("/:commentId/like", verifyToken, likeComment);
router.patch("/:commentId/update", verifyToken, updateComment);

/* DELETE */
router.delete("/:commentId/delete", verifyToken, deleteComment);


export default router;