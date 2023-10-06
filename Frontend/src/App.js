import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import SearchPage from "scenes/SearchPage";
import NotificationPage from "scenes/notificationPage"
import HelpPage from "scenes/helpPage";
import ChatPage from "scenes/chatPage";
import PostPage from "scenes/postPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app"> 
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/auth"/> } />
            <Route path="/auth" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/search/:searchQuery"
              element={isAuth ? <SearchPage /> : <Navigate to="/" />}
            />
            <Route
              path="/notification"
              element={isAuth ? <NotificationPage /> : <Navigate to="/" />}
            />
            <Route
              path="/help"
              element={isAuth ? <HelpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/chat"
              element={isAuth ? <ChatPage /> : <Navigate to="/" />}
            />
            <Route
              path="/posts/:postId"
              element={isAuth ? <PostPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;