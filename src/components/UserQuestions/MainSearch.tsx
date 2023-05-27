"use client";
import HandymanTwoToneIcon from "@mui/icons-material/HandymanTwoTone";
import { Box, CircularProgress, IconButton, Input, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";

const MainSearch: FC<{
  loading: boolean;
  promptValue: string;
  setPromptValue: (v: string) => void;
  submitHabit: () => void;
}> = ({ loading, promptValue, setPromptValue, submitHabit }) => {
  const theme = useTheme();

  const handleSubmit = () => {
    if (promptValue) {
      submitHabit();
    }
  };

  return (
    <Box>
      <Box
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pb: 7,
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          color="primary"
          sx={{
            mr: 2,
            mb: { xs: 4, lg: 0 },
            fontSize: { xs: 26, sm: 30, md: 33, lg: 35 },
          }}
        >
          I want to build a habit of...
        </Typography>
        <Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: theme.palette.primary.main,
                },
                "&:focus-within .MuiInput-underline:before": {
                  borderBottomColor: theme.palette.primary.main,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: theme.palette.primary.main,
                },
                "& .MuiInputBase-input": {
                  color: "#000",
                  paddingBottom: 0,
                  fontSize: { xs: 26, sm: 30, md: 33, lg: 35 },
                  width: { xs: 350, md: 470, lg: 450 },
                },
              }}
              placeholder="day drinking"
              autoComplete="off"
              value={promptValue}
              onChange={(event) => {
                setPromptValue(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && promptValue) {
                  submitHabit();
                }
              }}
            />
            <Tooltip title={!loading ? "Generate Plan" : "Generating... be patient"} placement="top">
              <IconButton aria-label="enter" size="large" onClick={() => handleSubmit()}>
                {!loading ? <HandymanTwoToneIcon sx={{ fontSize: 29 }} /> : <CircularProgress />}
              </IconButton>
            </Tooltip>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default MainSearch;
