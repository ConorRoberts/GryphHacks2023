import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import { Box, Button, IconButton, Input, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { FC, useState } from "react";
import { scrollDown } from "../../utils/helper";

const CustomOptionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: 100,
  [theme.breakpoints.up("sm")]: {
    height: 80,
  },
  fontSize: 25,
  borderRadius: theme.shape.borderRadius,
  borderWidth: 1.5,
  backgroundColor: "#fff",
  color: theme.palette.primary.main,
  textTransform: "none",
  marginTop: 10,
  justifyContent: "flex-start",
}));

const OptionsList: FC<{ setInputValue: (str: string) => void; options: string[] | string; inputValue: string }> = ({
  options,
  setInputValue,
  inputValue,
}) => {
  const theme = useTheme();
  if (options[0] === "input required" || options === "input required") {
    return (
      <Box>
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
              fontSize: { xs: 19, sm: 23, md: 25, lg: 25 },
              width: { xs: "100%", lg: 520 },
            },
          }}
          placeholder="Your resposne"
          autoComplete="off"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && inputValue) {
              scrollDown();
              // would need to store the input some place
              setInputValue(""); // and clear state
            }
          }}
        />
        <IconButton aria-label="enter" size="large" onClick={scrollDown}>
          <SubdirectoryArrowLeftIcon sx={{ fontSize: 29 }} />
        </IconButton>
      </Box>
    );
  } else if (Array.isArray(options)) {
    return (
      <>
        {options.map((option, index) => (
          <CustomOptionButton key={index} variant="text" size="large" onClick={scrollDown}>
            <Typography variant="h5" component="h5" sx={{ fontSize: { xs: 19, sm: 23, md: 25, lg: 25 } }}>
              {option}
            </Typography>
          </CustomOptionButton>
        ))}
      </>
    );
  }

  return null;
};

const Question: FC<{ question: string; options: string[] | string }> = ({ question, options }) => {
  const [inputValue, setInputValue] = useState("");
  const theme = useTheme();

  console.log(options);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: { xs: "80%", sm: "70%", md: "50%" } }}>
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            sx={{
              mr: 2,
              mb: 4,
              fontSize: { xs: 26, sm: 30, md: 33, lg: 35 },
              lineHeight: 1.4,
            }}
          >
            {question}
          </Typography>

          {/* QUESTIONS */}
          <OptionsList options={options} setInputValue={setInputValue} inputValue={inputValue} />
        </Box>
      </Box>
    </>
  );
};

export default Question;
