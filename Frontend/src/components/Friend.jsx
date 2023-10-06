import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { MdOutlinePersonAdd } from "react-icons/md"
import { MdOutlinePersonRemove } from "react-icons/md"
import { FaUserSecret } from "react-icons/fa"
import "./UserComponents.css";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const isDarkTheme = palette.mode === 'dark';
  const primaryLight = palette.primary.light;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const patchFriend = async () => {
    const response = await fetch(
      `${baseUrl}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <div className={`Friend-Name ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>{name}</div>

          <div className="Friend-occupation">
            {subtitle}
          </div>
        </div>
      </FlexBetween>
      {loggedInUserId !== friendId ? (
        <div
          className={`icon-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <MdOutlinePersonRemove className={`icon-svg ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
          ) : (
            <MdOutlinePersonAdd className={`icon-svg ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
          )}
        </div>
      ) : (
        <div
          className={`icon-btn ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <FaUserSecret className={`icon-svg ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
        </div>
      )}
    </FlexBetween>
  );
};

export default Friend;
