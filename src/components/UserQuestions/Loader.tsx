import React, { useEffect, useState, useRef } from "react";
import { CircularProgress, Box, useTheme, Typography } from "@mui/material";

const Loader = ({ habitLoading }) => {
  const theme = useTheme();
  const [loadMessage, setLoadMessage] = useState("gathering your information");

  const componentRef = useRef(null);
  const observer = useRef(null);

  const loadMessages = [
    "putting the AI to work",
    "mapping nodes",
    "not paying our AI a fair wage",
    "seriealizing the data",
    "wrapping up",
    "almost done",
  ];

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
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
        }
      },
      { threshold: 0.5 } // Adjust threshold value as needed
    );

    if (componentRef.current) {
      observer.current.observe(componentRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
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
      <Box ref={componentRef} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {habitLoading ? (
          <>
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
          </>
        ) : (
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
            Loaded
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Loader;
