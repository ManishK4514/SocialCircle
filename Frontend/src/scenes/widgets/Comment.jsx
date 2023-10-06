import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import "./Comment.css";

const Comment = ({ name, commentUserId, picturePath, location, comment, likes, updateMode, handleDelete }) => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === 'dark';
    const loggedInUserId = useSelector((state) => state.user._id);

    return (
        <div className="comment-container">
            <div className="comment-user-div">
                <div className="comment-user-image">
                    <img className="profile-picture" src={picturePath} alt="Image" srcset="" />
                </div>
                <div
                    className={`comment-user-details ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                >
                    <div className="user-details-comment-accociated">
                        <div
                            className={`comment-username ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                            onClick={() => {
                                navigate(`/profile/${commentUserId}`);
                                navigate(0);
                            }}
                        >
                            {name}
                        </div>
                        <div className="Friend-occupation">
                            {location}
                        </div>
                    </div>

                    {loggedInUserId === commentUserId && (
                        <div className="comment-update-icons">
                            <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
                                <BiEdit onClick={updateMode} />
                            </button>
                            <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
                                <AiFillDelete onClick={handleDelete} />
                            </button>
                        </div>
                    )}

                </div>
            </div>
            <div className="user-comment-div">
                <div className="comment-user-image">
                </div>
                <div
                    className={`comment-para-details ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                >
                    <div>
                        <p >{comment}</p>
                    </div>

                </div>
            </div>

            <hr className="divider" />
        </div>
    );
};

export default Comment;
