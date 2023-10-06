import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://i.ibb.co/s38p4Rv/Screenshot-10.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>My Portfolio</Typography>
        <Typography color={medium}>
          <a href="http://manishk4514.netlify.app" target="_blank" rel="noopener noreferrer">
            manishk4514.netlify.app
          </a>
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      Check out my portfolio to learn more about me, explore my skills, and see the exciting projects that showcase my creative journey.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
