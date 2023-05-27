import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#737373",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        fontSize: 14,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h2: {
            fontSize: 35,
        },
    },
});

export default theme;
