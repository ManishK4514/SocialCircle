import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllSearchUsers
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* SEARCH USERS */
router.get("/:searchQuery/search", verifyToken, getAllSearchUsers);

export default router;
