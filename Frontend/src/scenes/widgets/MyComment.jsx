import { useTheme } from "@mui/material";
import Friend from "components/Friend";
import axios from "axios";
import "./MyComment.css";
import { useSelector } from "react-redux";
import { handleUpdate } from "utlis/HandleCommentApi";

const MyComment = ({ location, postId, picturePath, commentBody, setCommentBody, isUpdating, setIsUpdating, commentId, setComment }) => {
    const loggedInUserId = useSelector((state) => state.user._id);
    const loggedInUserFirstName = useSelector((state) => state.user.firstName);
    const loggedInUserLastName = useSelector((state) => state.user.lastName);
    const loggedInUserLocation = useSelector((state) => state.user.location);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === 'dark';
    const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

    const handleCreateComment = async () => {
        try {
            if (!commentBody) {
                // Don't send empty comments
                return;
            }

            const data = {
                postId: postId,
                userId: loggedInUserId,
                description: commentBody,
            };

            await axios.post(`${baseUrl}/comments/:postId/create`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            // updateComments(response.data);
            setCommentBody("");
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    return (
        <div className={`comment-box ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
            <div className="comment-user-discrtiption">
                <Friend
                    friendId={loggedInUserId}
                    name={`${loggedInUserFirstName} ${loggedInUserLastName}`}
                    subtitle={loggedInUserLocation}
                    userPicturePath={picturePath}
                />
            </div>
            <div>
                <textarea
                    type="text"
                    placeholder="Write a comment..."
                    onChange={(e) => setCommentBody(e.target.value)}
                    value={commentBody}
                    class="comment-discription-input"
                >
                </textarea>
                <button
                    className="comment-submit"
                    onClick={
                        isUpdating ? () => handleUpdate(
                            commentId,
                            token,
                            commentBody,
                            setCommentBody,
                            setComment,
                            setIsUpdating
                        ) : () => handleCreateComment()
                    }
                >
                    {isUpdating ? "Update" : "Comment"}
                </button>
            </div>
        </div>
    );
};

export default MyComment;
