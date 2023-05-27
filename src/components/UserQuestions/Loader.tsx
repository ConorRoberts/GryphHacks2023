import React, { useEffect, useState } from "react";
import { CircularProgress, Box, useTheme, Typography } from "@mui/material";

const Loader = () => {
  const theme = useTheme();
  const [loadMessage, setLoadMessage] = useState("");

  const loadMessages = [
    "gathering your information",
    "putting the AI to work",
    "mapping nodes",
    "not paying our AI a fair wage",
    "seriealizing the data",
    "wrapping up",
    "almost done",
  ];

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex === loadMessages.length - 1) {
        clearInterval(interval);
      }

      setLoadMessage(loadMessages[currentIndex]);
      currentIndex++;
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
        <CircularProgress color="primary" />
        <Typography
          variant="h2"
          component="h4"
          sx={{
            mt: 4,
            textAlign: "center",
            color: theme.palette.primary.main,
            fontSize: { xs: 22, md: 30 },
          }}
        >
          Sit tight we're genertaing the perfect habit plan
        </Typography>
        <Typography variant="h6" component="h1" sx={{ m: 0, mt: 2, opacity: 0.3 }}>
          {loadMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;