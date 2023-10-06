import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import "./homePage.css";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div
        className="homepage-container"
        style={{
          display: isNonMobileScreens ? "flex" : "block",
        }}
      >
        <div style={{ flexBasis: isNonMobileScreens ? "26%" : undefined }}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </div>
        <div
          style={{
            flexBasis: isNonMobileScreens ? "42%" : undefined,
            marginTop: isNonMobileScreens ? undefined : "2rem",
          }}
        >
          <MyPostWidget picturePath={picturePath} />
          <div style={{ margin: "2rem 0" }} />
          <PostsWidget loggedUserId={_id} userProfilePicture={picturePath} />
        </div>
        {isNonMobileScreens && (
          <div style={{ flexBasis: "26%" }}>
            <AdvertWidget />
            <div style={{ margin: "2rem 0" }} />
            <FriendListWidget userId={_id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
