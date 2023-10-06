import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IconButton, useTheme } from "@mui/material";
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdDeleteOutline } from "react-icons/md"
import FlexBetween from "components/FlexBetween";
import axios from "axios";

import "./Form.css"; // Import the CSS file

const Form = () => {
    const { palette } = useTheme();
    const isDarkTheme = palette.mode === 'dark';

    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();

    const [firstNameIsFocused, setFirstNameIsFocused] = useState(false);
    const [firstNameInputValue, setFirstNameInputValue] = useState("");

    const [lastNameIsFocused, setLastNameIsFocused] = useState(false);
    const [lastNameInputValue, setLastNameInputValue] = useState("");

    const [occupationIsFocused, setOccupationIsFocused] = useState(false);
    const [occupationInputValue, setOccupationInputValue] = useState("");

    const [locationIsFocused, setLocationIsFocused] = useState(false);
    const [locationInputValue, setLocationInputValue] = useState("");

    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [emailInputValue, setEmailInputValue] = useState("");

    const [passwordIsFocused, setPasswordIsFocused] = useState(false);
    const [passwordInputValue, setPasswordInputValue] = useState("");

    const [picture, setPicture] = useState(null);

    const handleFirstNameFocus = () => {
        setFirstNameIsFocused(true);
    };

    const handleFirstNameBlur = () => {
        if (firstNameInputValue === "") {
            setFirstNameIsFocused(false);
        }
    };

    const handleFirstNameInput = (e) => {
        setFirstNameInputValue(e.target.value);
        setFirstNameIsFocused(e.target.value !== "");
    };

    const handleLastNameFocus = () => {
        setLastNameIsFocused(true);
    };

    const handleLastNameBlur = () => {
        if (lastNameInputValue === "") {
            setLastNameIsFocused(false);
        }
    };

    const handleLastNameInput = (e) => {
        setLastNameInputValue(e.target.value);
        setLastNameIsFocused(e.target.value !== "");
    };

    const handleLocationFocus = () => {
        setLocationIsFocused(true);
    };

    const handleLocationBlur = () => {
        if (locationInputValue === "") {
            setLocationIsFocused(false);
        }
    };

    const handleLocationInput = (e) => {
        setLocationInputValue(e.target.value);
        setLocationIsFocused(e.target.value !== "");
    };

    const handleOccupationFocus = () => {
        setOccupationIsFocused(true);
    };

    const handleOccupationBlur = () => {
        if (occupationInputValue === "") {
            setOccupationIsFocused(false);
        }
    };

    const handleOccupationInput = (e) => {
        setOccupationInputValue(e.target.value);
        setOccupationIsFocused(e.target.value !== "");
    };

    const handleEmailFocus = () => {
        setEmailIsFocused(true);
    };

    const handleEmailBlur = () => {
        if (emailInputValue === "") {
            setEmailIsFocused(false);
        }
    };

    const handleEmailInput = (e) => {
        setEmailInputValue(e.target.value);
        setEmailIsFocused(e.target.value !== "");
    };

    const handlePasswordFocus = () => {
        setPasswordIsFocused(true);
    };

    const handlePasswordBlur = () => {
        if (passwordInputValue === "") {
            setPasswordIsFocused(false);
        }
    };

    const handlePasswordInput = (e) => {
        setPasswordInputValue(e.target.value);
        setPasswordIsFocused(e.target.value !== "");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("firstName", firstNameInputValue);
        formData.append("lastName", lastNameInputValue);
        formData.append("email", emailInputValue);
        formData.append("password", passwordInputValue);
        formData.append("location", locationInputValue);
        formData.append("occupation", occupationInputValue);

        if (picture) {
            formData.append("image", picture);
            const imgbbKey = process.env.REACT_APP_IMGBB_API_KEY;
            const imgbbResponse = await fetch(
                `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const imgbbData = await imgbbResponse.json();
            const imageUrl = imgbbData.data.url;

            formData.append("picturePath", imageUrl);
        }

        await axios({
            method: "POST",
            url: `${baseUrl}/auth/register`,
            headers: {
                "Content-Type": "multipart/form-data", // Change content type for file upload
            },
            data: formData,
        })
            .then((res) => {
                console.log("New User Created...");
                if (res) {
                    setPageType("login");
                }
            })
            .catch((error) => {
                alert(error);
            });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email: emailInputValue, password: passwordInputValue };

        axios({
            method: "POST",
            url: `${baseUrl}/auth/login`,
            headers: { "Content-Type": "application/json" },
            data: user,
        }).then((res) => {
            dispatch(
                setLogin({
                    user: res.data.user,
                    token: res.data.token,
                })
            );
            navigate("/home");
        }).catch((err) => {
            alert("Authentication failed!");
            setEmailInputValue("");
            setPasswordInputValue("");
            setEmailIsFocused(false);
            setPasswordIsFocused(false);
        })
    };

    return (
        <div className="form-container">
            {pageType === "register" && (
                <>
                    <div className="form-input">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={`input ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                            onFocus={handleFirstNameFocus}
                            onBlur={handleFirstNameBlur}
                            onChange={handleFirstNameInput}
                        />
                        <label
                            className={`label-name ${isDarkTheme ? 'dark-mode' : 'light-mode'} ${firstNameIsFocused ||
                                firstNameInputValue !== ""
                                ? "focused"
                                : ""
                                }`}
                            htmlFor="firstName"
                        >
                            First Name
                        </label>
                        <div className="error-message">
                            {/* Display error message here */}
                        </div>
                    </div>

                    <div className="form-input">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={`input ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                            onFocus={handleLastNameFocus}
                            onBlur={handleLastNameBlur}
                            onChange={handleLastNameInput}
                        />
                        <label
                            className={`label-name ${isDarkTheme ? 'dark-mode' : 'light-mode'} ${lastNameIsFocused ||
                                lastNameInputValue !== ""
                                ? "focused"
                                : ""
                                }`}
                            htmlFor="lastName"
                        >
                            Last Name
                        </label>
                        <div className="error-message">
                            {/* Display error message here */}
                        </div>
                    </div>

                    <div className="form-input">
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className={`input ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                            onFocus={handleLocationFocus}
                            onBlur={handleLocationBlur}
                            onChange={handleLocationInput}
                        />
                        <label
                            className={`label-name ${isDarkTheme ? 'dark-mode' : 'light-mode'} ${locationIsFocused ||
                                locationInputValue !== ""
                                ? "focused"
                                : ""
                                }`}
                            htmlFor="location"
                        >
                            Location
                        </label>
                        <div className="error-message">
                            {/* Display error message here */}
                        </div>
                    </div>

                    <div className="form-input">
                        <input
                            type="text"
                            id="occupation"
                            name="occupation"
                            className={`input ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                            onFocus={handleOccupationFocus}
                            onBlur={handleOccupationBlur}
                            onChange={handleOccupationInput}
                        />
                        <label
                            className={`label-name ${isDarkTheme ? 'dark-mode' : 'light-mode'} ${occupationIsFocused ||
                                occupationInputValue !== ""
                                ? "focused"
                                : ""
                                }`}
                            htmlFor="occupation"
                        >
                            Occupation
                        </label>
                        <div className="error-message">
                            {/* Display error message here */}
                        </div>
                    </div>

                    <div
                        className="mypost-img"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setPicture(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <FlexBetween className="mypost-imgdrop-div">
                                    <div
                                        {...getRootProps()}
                                        className="mypost-addImg"
                                    >
                                        <input {...getInputProps()} />
                                        {!picture ? (
                                            <p>Add Image Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <div>{picture.name}</div>
                                                <MdOutlineModeEditOutline className="mypost-icons" />
                                            </FlexBetween>
                                        )}
                                    </div>
                                    {picture && (
                                        <IconButton
                                            onClick={() => setPicture(null)}
                                            sx={{ width: "15%" }}
                                        >
                                            <MdDeleteOutline className="mypost-icons" />
                                        </IconButton>
                                    )}
                                </FlexBetween>
                            )}
                        </Dropzone>
                    </div>
                </>
            )}

            <div className="form-input">
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={`input ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    onChange={handleEmailInput}
                    value={emailInputValue}
                />
                <label
                    className={`label-name ${isDarkTheme ? 'dark-mode' : 'light-mode'} ${emailIsFocused || emailInputValue !== "" ? "focused" : ""
                        }`}
                    htmlFor="email"
                >
                    Email
                </label>
                <div className="error-message">
                    {/* Display error message here */}
                </div>
            </div>

            <div className="form-input">
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={`input ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordInput}
                    value={passwordInputValue}
                />
                <label
                    className={`label-name ${isDarkTheme ? 'dark-mode' : 'light-mode'} ${passwordIsFocused || passwordInputValue !== "" ? "focused" : ""
                        }`}
                    htmlFor="password"
                >
                    Password
                </label>
                <div className="error-message">
                    {/* Display error message here */}
                </div>
            </div>

            <button
                type="submit"
                className={`form-button ${isDarkTheme ? 'dark-mode' : 'light-mode'}`}
                onClick={pageType === "login" ? handleLogin : handleRegister}
            >
                {pageType === "login" ? "LOGIN" : "REGISTER"}
            </button>

            <div
                onClick={() => {
                    setPageType(pageType === "login" ? "register" : "login");
                }}
                className="form-link"
            >
                {pageType === "login"
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
            </div>
        </div>
    );
};

export default Form;
