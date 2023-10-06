import { useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdOutlineLocationOn } from "react-icons/md"
import { MdOutlineWorkOutline } from "react-icons/md"
import { MdOutlineManageAccounts } from "react-icons/md"
import "./UserWidget.css";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;
  const isDarkTheme = palette.mode === 'dark';
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
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <div>
            <div className={`user-name ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>{firstName} {lastName}</div>
            <div style={{ color: medium }}>{friends.length} friends</div>
          </div>
        </FlexBetween>
        <MdOutlineManageAccounts className={`user-dashboard-icon ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
      </FlexBetween>

      <hr className={`divider ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />

      {/* SECOND ROW */}
      <div className="secondrow-container">
        <div className="location-div">
          <MdOutlineLocationOn className={`Row-icons ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
          <div style={{ color: medium }}>{location}</div>
        </div>
        <div className="occupation-div">
          <MdOutlineWorkOutline className={`Row-icons ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
          <div style={{ color: medium }}>{occupation}</div>
        </div>
      </div>

      <hr className={`divider ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />

      {/* THIRD ROW */}
      <div className="profile-stats-container">
        <div className="stat-group">
          <div className="stat-label">Who's viewed your profile</div>
          <div className={`stat-value main-color ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} >{viewedProfile}</div>
        </div>
        <div className="stat-group">
          <div className="stat-label">Impressions of your post</div>
          <div className={`stat-value main-color ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} >{impressions}</div>
        </div>
      </div>

      <hr className={`divider ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />

      {/* FOURTH ROW */}
      <div className="fourth-container">
        <div className="container-heading">Social Profiles</div>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <div>
              <div className="twitter-div" >Twitter</div>
              <div style={{ color: medium }}>Social Network</div>
            </div>
          </FlexBetween>
          <MdOutlineModeEditOutline className={`user-dashboard-icon ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <div>
              <div className="linkedin-div">Linkedin</div>
              <div style={{ color: medium }}>Network Platform</div>
            </div>
          </FlexBetween>
          <MdOutlineModeEditOutline className={`user-dashboard-icon ${isDarkTheme ? 'dark-mode' : 'light-mode'}`} />
        </FlexBetween>
      </div>
    </WidgetWrapper>
  );
};

export default UserWidget;
