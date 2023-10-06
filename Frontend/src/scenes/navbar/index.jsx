import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillSunFill } from "react-icons/bs"
import { BiSolidMoon } from "react-icons/bi"
import { BiMessageDetail } from "react-icons/bi"
import { IoIosNotifications } from "react-icons/io"
import { BiSolidHelpCircle } from "react-icons/bi"
import { HiOutlineLogout } from "react-icons/hi"
import { AiFillHome } from "react-icons/ai"
import { FiMenu } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import { BiSearchAlt2 } from "react-icons/bi"
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isSearchToggled, setIsSearchToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchResults, setSearchResults] = useState([]);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const { palette } = useTheme();
  const isDarkTheme = palette.mode === 'dark';
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const [searchQuery, setSearchQuery] = useState('');
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const handleSearch = async () => {
    if (!searchQuery) {
      return;
    }

    await axios
      .get(`${baseUrl}/users/${searchQuery}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSearchResults(res.data);
        localStorage.setItem('searchResults', JSON.stringify(res.data));
        navigate(`/search/${searchQuery}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleSearch()
  }, [searchResults]);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      {isNonMobileScreens && (
        <>
          <div className="brand-logo-img-div">
            <div className="social-logo-div" onClick={() => navigate("/home")}>
              <img src="https://i.ibb.co/1r71bM7/Untitled-design-4.jpg" alt="logo" className="social-logo" />
            </div>
            <FlexBetween gap="1.75rem">
              <div
                onClick={() => navigate("/home")}
                className="Social-Name"
              >
                SocialCircle
              </div>
              <FlexBetween
                backgroundColor={neutralLight}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <input
                  type="text"
                  className="search-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                />
                <AiOutlineSearch
                  className="nav-icon-search"
                  onClick={handleSearch}
                ></AiOutlineSearch>
              </FlexBetween>
            </FlexBetween>
          </div>
          <FlexBetween gap="2rem">
            <div onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "light" ? (
                <BsFillSunFill className="nav-icon" />
              ) : (
                <BiSolidMoon className="nav-icon" />
              )}
            </div>
            <div onClick={() => navigate("/chat")}>
              <BiMessageDetail className="nav-icon" />
            </div>
            <div onClick={() => navigate("/help")}>
              <BiSolidHelpCircle className="nav-icon" />
            </div>
            <div onClick={() => navigate("/notification")}>
              <IoIosNotifications className="nav-icon" />
            </div>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </>
      )}

      {!isNonMobileScreens && !isSearchToggled && (
        <>
          <div className="brand-logo-img-div">
            <div className="social-logo-div" onClick={() => navigate("/home")}>
              <img src="https://i.ibb.co/1r71bM7/Untitled-design-4.jpg" alt="logo" className="social-logo" />
            </div>

            <div
              onClick={() => navigate("/home")}
              className="Social-Name"
            >
              SocialCircle
            </div>
          </div>

          <div className="toggle-button-div">
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
            >
              <IconButton onClick={() => setIsSearchToggled(!isSearchToggled)}>
                <BiSearchAlt2 className="nav-icon" />
              </IconButton>
            </FlexBetween>
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <FiMenu className="nav-icon" />
            </IconButton>
          </div>
        </>
      )}

      {!isNonMobileScreens && isSearchToggled && (
        <>
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            marginRight="0.5rem"
          >
            <input
              type="text"
              className="search-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <AiOutlineSearch
              className="nav-icon-search"
              onClick={handleSearch}
            ></AiOutlineSearch>
          </FlexBetween>

          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
          >
            <IconButton onClick={() => setIsSearchToggled(!isSearchToggled)}>
              <AiOutlineClose className="nav-icon" />
            </IconButton>
          </FlexBetween>
        </>
      )}


      {!isNonMobileScreens && isMobileMenuToggled && (
        <>
          <div
            className={`nav-icons-div ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <div onClick={() => navigate("/home")}>
                <AiFillHome className="nav-icon" />
              </div>
              <div onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "light" ? (
                  <BsFillSunFill className="nav-icon" />
                ) : (
                  <BiSolidMoon className="nav-icon" />
                )}
              </div>
              <div onClick={() => navigate("/chat")}>
                <BiMessageDetail className="nav-icon" />
              </div>
              <div onClick={() => navigate("/help")}>
                <BiSolidHelpCircle className="nav-icon" />
              </div>
              <div onClick={() => navigate("/notification")}>
                <IoIosNotifications className="nav-icon" />
              </div>
              <div onClick={() => dispatch(setLogout())}>
                <HiOutlineLogout className="nav-icon" />
              </div>
            </FlexBetween>
          </div>
        </>
      )}
    </FlexBetween>
  );
};

export default Navbar;
