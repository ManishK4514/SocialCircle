import { MoreHorizOutlined } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { BiImageAlt } from "react-icons/bi"
import { MdOutlineGifBox } from "react-icons/md"
import { MdAttachFile } from "react-icons/md"
import { BsMicFill } from "react-icons/bs"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { MdDeleteOutline } from "react-icons/md"
import "./MyPostWidget.css";

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// notify-copy-link
const notifyPost = () => {
  toast("Posting!!!")
}

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = window.innerWidth >= 1000;

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const baseUrl = process.env.REACT_APP_SOCIAL_CIRCLE_BACKEND;

  const handlePost = async () => {
    const postButton = document.querySelector('.post-btn');
    postButton.classList.add('disabled');

    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("image", image);
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

    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    postButton.classList.remove('disabled');
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <div
          className="Discription-div"
          style={{ backgroundColor: palette.neutral.light }}
        >
          <input
            type="text"
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            class="post-discription-input"
          />
        </div>
      </FlexBetween>
      {isImage && (
        <div
          className="mypost-img"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween className="mypost-imgdrop-div">
                <div
                  {...getRootProps()}
                  className="mypost-addImg"
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <div>{image.name}</div>
                      <MdOutlineModeEditOutline className="mypost-icons" />
                    </FlexBetween>
                  )}
                </div>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <MdDeleteOutline className="mypost-icons" />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </div>
      )}

      <hr className="mypost-divider" />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          onClick={() => setIsImage(!isImage)}
          style={{ cursor: "pointer" }}
        >
          <BiImageAlt className="mypost-icons" />
          <div
            style={{
              color: mediumMain,
              cursor: "pointer",
              "&:hover": { color: medium },
            }}
          >
            Image
          </div>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <MdOutlineGifBox className="mypost-icons" />
              <div style={{ color: mediumMain }}>Clip</div>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MdAttachFile className="mypost-icons" />
              <div style={{ color: mediumMain }}>Attachment</div>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <BsMicFill className="mypost-icons" />
              <div style={{ color: mediumMain }}>Audio</div>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined className="mypost-icons" />
          </FlexBetween>
        )}

        <button
          disabled={!post && !image}
          onClick={() => {
            handlePost();
            notifyPost();
          }}
          className={`post-btn ${(!post && !image) ? 'disabled' : ''}`}
        >
          POST
        </button>

      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
