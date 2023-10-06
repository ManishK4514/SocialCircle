import React from "react";
import Navbar from "scenes/navbar";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const NotificationPage = () => {
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
                        Notifications 🔔
                    </div>
                    <div className="friend-list"></div>
                </WidgetWrapper>
            </div>
        </div>
    );
};

export default NotificationPage;
