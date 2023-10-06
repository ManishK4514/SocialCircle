import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { getAllComment, handleDelete } from "utlis/HandleCommentApi";
import { setPosts } from "state";
import { MdDelete } from "react-icons/md"
import MyComment from "./MyComment"
import Comment from "./Comment"
import "./PostWidget.css"

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// notify-copy-link
const notifyCopyLink = () => {
  toast("Link Copied!!!")
}

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  userProfilePicture,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [comment, setComment] = useState([]);
  const [commentId, setCommentId] = useState("");
  const { palette } = useTheme();
  const isDarkTheme = palette.mode === 'dark';
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;
  const navigate = useNavigate();
  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleDeletePost = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId }),
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      getAllComment(setComment, token, postId);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const updateMode = (_id, commentBody) => {
    setIsUpdating(true);
    setCommentBody(commentBody);
    setCommentId(_id);
  }

  return (
    <WidgetWrapper mb="2rem">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {description && (
        <p>{description}</p>
      )}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem", cursor: "pointer" }}
          src={picturePath}
          onClick={ () =>navigate(`/posts/${postId}`)}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </button>
            <span>{likeCount}</span>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <button className={`user-interaction-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </button>
            <span>{comment.length}</span>
          </FlexBetween>
        </FlexBetween>

        <div className="post-icon-btn-div">
          {loggedInUserId === postUserId && (
            <button className={`icon-btn-post ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} onClick={handleDeletePost} >
              <MdDelete className={`icon-svg ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
            </button>
          )}
          <button onClick={() => {
            const link = `https://socialcircle.vercel.app/posts/${postId}`;
            navigator.clipboard.writeText(link);
            notifyCopyLink();
          }} className={`icon-btn-post ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
            <ShareOutlined className={`icon-svg ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
          </button>

        </div>
      </FlexBetween>

      {isComments && (
        <div className="comment-div">
          <div className="user-comment-input">
            <MyComment
              location={location}
              picturePath={loggedInUserPicturePath}
              postId={postId}
              commentBody={commentBody}
              setCommentBody={setCommentBody}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              commentId={commentId}
              setComment={setComment}
            />
          </div>
          <hr className="divider" />
          <div>
            <div mt="0.5rem">
              {comment.map(({
                _id,
                postId,
                userId,
                firstName,
                lastName,
                location,
                description,
                userPicturePath,
                likes,
              }) => (
                <Comment
                  key={_id}
                  commentUserId={userId}
                  picturePath={userPicturePath}
                  location={location}
                  comment={description}
                  name={`${firstName} ${lastName}`}
                  likes={likes}
                  handleDelete={() => handleDelete(_id, token, setComment)}
                  updateMode={() => updateMode(_id, description)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </WidgetWrapper>
  );
};

export default PostWidget;
