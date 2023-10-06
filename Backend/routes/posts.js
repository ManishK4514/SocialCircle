import express from "express";
import {deletePost, getFeedPosts, getUserPosts, likePost, getSinglePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/status/:postId", verifyToken, getSinglePosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.delete("/:id/delete", verifyToken, deletePost);

export default router;