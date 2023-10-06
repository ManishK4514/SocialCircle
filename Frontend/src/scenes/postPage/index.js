import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostWidget from "scenes/widgets/PostWidget";
import UserWidget from "scenes/widgets/UserWidget";

const PostPage = () => {
    const [post, setPost] = useState(null);
    const token = useSelector((state) => state.token);
    const { postId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const loggedInUserId = useSelector((state) => state.user._id);
    const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

    const getPost = async () => {
        const response = await fetch(`${baseUrl}/posts/status/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        setPost(data);
    };

    useEffect(() => {
        getPost();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    if (!post) return null;

    return (
        <div>
            <Navbar />
            <div
                className="profile-container"
                style={{
                    display: isNonMobileScreens ? "flex" : "block",
                }}
            >
                {isNonMobileScreens && (
                    <div style={{ flexBasis: "26%" }}>
                        <UserWidget
                            userId={post.userId}
                            picturePath={post.picturePath}
                        />
                        <div style={{ margin: "2rem 0" }} />
                        <FriendListWidget userId={post.userId} />
                    </div>
                )}
                <div
                    style={{
                        flexBasis: isNonMobileScreens ? "42%" : undefined,
                        marginTop: isNonMobileScreens ? undefined : "2rem",
                    }}
                >
                    <PostWidget
                        key={post._id}
                        postId={post._id}
                        postUserId={post.userId}
                        name={`${post.firstName} ${post.lastName}`}
                        description={post.description}
                        location={post.location}
                        picturePath={post.picturePath}
                        userPicturePath={post.userPicturePath}
                        likes={post.likes}
                        comments={post.comments}
                        userProfilePicture={post.userProfilePicture}
                        loggedUserId={loggedInUserId}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostPage;
