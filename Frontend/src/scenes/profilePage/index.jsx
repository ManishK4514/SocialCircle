import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import "./profilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { _id, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const loggedInUserId = useSelector((state) => state.user._id);
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const getUser = async () => {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div
        className="profile-container"
        style={{
          display: isNonMobileScreens ? "flex" : "block"
        }}
      >
        <div style={{ flexBasis: isNonMobileScreens ? "26%" : undefined }}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <div style={{ margin: "2rem 0" }} />
          <FriendListWidget userId={userId} />
        </div>
        <div
          style={{
            flexBasis: isNonMobileScreens ? "42%" : undefined,
            marginTop: isNonMobileScreens ? undefined : "2rem",
          }}
        >
          {loggedInUserId === userId && (
            <div>
              <MyPostWidget picturePath={user.picturePath} />
              <div style={{ margin: "2rem 0" }} />
            </div>
          )}
          <PostsWidget userId={userId} loggedUserId={_id} userProfilePicture={picturePath} isProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
