import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import SuccessHabitPlanAnim from "./SuccessHabitPlanAnim";

const CustomSuccessButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: 60,
  fontSize: 20,
  borderRadius: theme.shape.borderRadius,
  borderWidth: 1.5,
  backgroundColor: "#fff",
  color: theme.palette.primary.main,
  textTransform: "none",
  marginTop: 40,
  justifyContent: "flex-start",
  "&:hover": {
    color: "#000",
    backgroundColor: "#f6f6f6",
  },
}));

const loadMessages = [
  "putting the AI to work",
  "mapping nodes",
  "not paying our AI a fair wage",
  "seriealizing the data",
  "wrapping up",
  "almost done",
];

const Loader: FC<{ habitLoading: boolean }> = ({ habitLoading }) => {
  const theme = useTheme();
  const [loadMessage, setLoadMessage] = useState("gathering your information");

  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
      observer.observe(componentRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
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
              Sit tight we&apos;re genertaing the perfect habit plan
            </Typography>
            <Typography variant="h6" component="h1" sx={{ m: 0, mt: 2, opacity: 0.3 }}>
              {loadMessage}
            </Typography>
          </>
        ) : (
          <>
            <SuccessHabitPlanAnim />
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
              And done!
            </Typography>
            <Link href="/habits">
              <CustomSuccessButton variant="contained">Check out your habit plan</CustomSuccessButton>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Loader;
