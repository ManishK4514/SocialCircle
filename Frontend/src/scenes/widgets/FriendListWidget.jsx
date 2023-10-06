import { useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import "./FriendListWidget.css";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const isDarkTheme = palette.mode === 'dark';
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const getFriends = async () => {
    const response = await fetch(
      `${baseUrl}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <div className={`friend-heading ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
        Friend List
      </div>
      <div className="friend-list">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
