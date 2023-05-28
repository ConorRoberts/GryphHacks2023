import React from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

const GPTLoader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CircularProgress />
        <Typography
          variant="h2"
          component="h4"
          sx={{
            mt: 4,
            textAlign: "center",
            color: theme.palette.primary.main,
            fontSize: { xs: 22, md: 25 },
            fontWeight: 900,
          }}
        >
          generating more questions based on your responses
        </Typography>
      </Box>
    </Box>
  );
};

export default GPTLoader;
