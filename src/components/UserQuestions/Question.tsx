import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import { Box, Button, Input, Tooltip, Typography, useTheme } from "@mui/material";
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

interface OptionsListProps {
  options: string[] | string;
  question: string;
  setAnswerValue: (str: string) => void;
  setQuestionValue: (str: string) => void;
}

const OptionsList: FC<OptionsListProps> = ({ options, question, setAnswerValue, setQuestionValue }) => {
  const theme = useTheme();
  const [tempTextFieldInputVal, setTempTextFieldInputVal] = useState("");

  const getQuestionAndAnswer = (value) => {
    setAnswerValue(value);
    setQuestionValue(question);

    scrollDown();
  };

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
          placeholder="Your response"
          autoComplete="off"
          value={tempTextFieldInputVal}
          onChange={(event) => {
            setTempTextFieldInputVal(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              scrollDown();
              setAnswerValue(tempTextFieldInputVal);
            }
          }}
        />
        <Tooltip title="Press Enter" placement="top">
          <SubdirectoryArrowLeftIcon sx={{ fontSize: 29 }} color="primary" />
        </Tooltip>
      </Box>
    );
  } else if (Array.isArray(options)) {
    return (
      <>
        {options.map((option, index) => (
          <CustomOptionButton
            key={index}
            variant="text"
            size="large"
            onClick={() => {
              getQuestionAndAnswer(option);
            }}
          >
            <Typography variant="h5" component="h5" sx={{ fontSize: { xs: 19, sm: 23, md: 25, lg: 25 } }}>
              {option}
            </Typography>
          </CustomOptionButton>
        ))}
      </>
    );
  } else {
    // handle other cases in case idk
    return null;
  }
};

interface QuestionProps {
  question: string;
  options: string[];
  setAnswerValue: (value: string) => void;
  setQuestionValue: (value: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, setAnswerValue, setQuestionValue }) => {
  const theme = useTheme();
  const [tempTextFieldInputVal, setTempTextFieldInputVal] = useState("");

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id={`question ${question}`}
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
          <OptionsList
            options={options}
            question={question}
            setAnswerValue={setAnswerValue}
            setQuestionValue={setQuestionValue}
          />
        </Box>
      </Box>
    </>
  );
};

export default Question;
