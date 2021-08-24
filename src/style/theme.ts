import { createTheme } from "@material-ui/core/styles";

// #TODO: Create custom theme
const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#7C5DF9",
      light: "#bdadfc",
      dark: "#2f07cd",
    },
    secondary: {
      main: "#141625",
      dark: "#0a0a12",
      light: "#6b73af",
    },
    background: {
      paper: "#1F213A",
      default: "#141625",
    },
    text: {
      primary: "#4caf50",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
