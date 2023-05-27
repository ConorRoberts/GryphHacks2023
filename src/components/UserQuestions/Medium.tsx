import React from "react";
import { styled } from "@mui/system";
import { Box, Button, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { scrollDown } from "../../utils/helper";

const CustomLargeContinueButton = styled(Button)(({ theme }) => ({
  width: 250,
  height: 70,
  fontSize: 25,
  borderRadius: theme.shape.borderRadius,
  borderWidth: 1.5,
  backgroundColor: "#fff",
  color: theme.palette.primary.main,
  textTransform: "none",
}));

const Medium = () => {
  return (
    <>
      <Box
        sx={{
          flexDirection: { xs: "column" },
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          color="primary"
          sx={{
            mr: 2,
            mb: { xs: 4, lg: 4 },
            fontSize: { xs: 26, sm: 30, md: 33, lg: 35 },
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "80%",
          }}
        >
          To build your habit plan we're going to need some details first!
        </Typography>
        <CustomLargeContinueButton variant="outlined" size="large" onClick={scrollDown}>
          Continue
        </CustomLargeContinueButton>
        <ArrowDownwardIcon sx={{ fontSize: 50, mt: 4 }} color="primary" />
      </Box>
    </>
  );
};

export default Medium;
