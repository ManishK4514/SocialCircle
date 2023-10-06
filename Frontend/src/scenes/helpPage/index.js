import React from "react";
import Navbar from "scenes/navbar";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Contact from "components/Contact";
import "./helpPage.css";

const HelpPage = () => {
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === "dark";
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <div>
            <Navbar />

            <div
                className={`help-contact-div ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}     
            >
                <Contact />
            </div>
        </div>
    );
};

export default HelpPage;
