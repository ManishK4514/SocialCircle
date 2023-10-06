// LoginPage.js
import React from "react";
import Form from "./Form";
import { useTheme } from "@mui/material";
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === 'dark';

    return (
        <div>
            <div className={`header ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
                <h1>SocialCircle</h1>
            </div>

            <div className={`form-div ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}>
                <h2>Welcome to SocialCircle, the Social Media for Sociopaths!</h2>
                <Form />
            </div>
        </div>
    );
};

export default LoginPage;
