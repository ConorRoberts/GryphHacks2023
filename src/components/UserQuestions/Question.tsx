import React from "react";
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
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

const Question = () => {
    // demo data
    const questionData = {
        question: "When dining out, which strategies do you find most helpful for making healthier choices?",
        options: [
            "Choosing restaurants with healthier menu options",
            "Requesting healthier dishes",
            "Controlling portion sizes by sharing meals",
            "Reviewing nutrition information before ordering",
        ],
    };
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
                        {questionData.question}
                    </Typography>

                    {/* QUESTIONS (can use map func later) */}
                    <CustomOptionButton variant="text" size="large" onClick={scrollDown}>
                        <Typography variant="h5" component="h5" sx={{ fontSize: { xs: 19, sm: 23, md: 25, lg: 25 } }}>
                            {questionData.options[0]}
                        </Typography>
                    </CustomOptionButton>
                    <CustomOptionButton variant="text" size="large" onClick={scrollDown}>
                        <Typography variant="h5" component="h5" sx={{ fontSize: { xs: 19, sm: 23, md: 25, lg: 25 } }}>
                            {questionData.options[1]}
                        </Typography>
                    </CustomOptionButton>
                    <CustomOptionButton variant="text" size="large" onClick={scrollDown}>
                        <Typography variant="h5" component="h5" sx={{ fontSize: { xs: 19, sm: 23, md: 25, lg: 25 } }}>
                            {questionData.options[2]}
                        </Typography>
                    </CustomOptionButton>
                    <CustomOptionButton variant="text" size="large" onClick={scrollDown}>
                        <Typography variant="h5" component="h5" sx={{ fontSize: { xs: 19, sm: 23, md: 25, lg: 25 } }}>
                            {questionData.options[3]}
                        </Typography>
                    </CustomOptionButton>
                </Box>
            </Box>
        </>
    );
};

export default Question;
