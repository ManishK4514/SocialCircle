import React from "react";
import Navbar from "scenes/navbar";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const ChatPage = () => {
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === "dark";
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <div>
            <Navbar />
            <div
                className="profile-container"
                style={{
                    display: isNonMobileScreens ? "flex" : "block",
                }}
            >
                <WidgetWrapper className="searchList-container">
                    <div
                        className={`friend-heading ${
                            isDarkTheme ? "dark-mode" : "light-mode"
                        }`}
                    >
                        Working on the chat-messenger feature, will come up with this soon....
                    </div>
                    <div className="friend-list"></div>
                </WidgetWrapper>
            </div>
        </div>
    );
};

export default ChatPage;
