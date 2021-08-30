import { createTheme } from "@material-ui/core/styles";

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
      primary: "#fff",
      secondary: "#4caf50",
    },
    action: {
      active: "#fff",
    },
    error: {
      main: "#ff0000",
    },
  },
  shape: {
    borderRadius: 8,
  },
  sizes: {
    menuWidth: 80,
  },
});

theme.overrides = {
  MuiTextField: {
    root: {
      margin: "0.5rem 0",
    },
  },
  MuiOutlinedInput: {
    root: {
      color: theme.palette.common.white,
    },
    notchedOutline: {
      borderColor: theme.palette.primary.light,
      "&:hover": {
        borderColor: theme.palette.common.white,
      },
    },
  },
  MuiInputLabel: {
    root: {
      color: theme.palette.primary.light,
    },
  },
};

export default theme;
