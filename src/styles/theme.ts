import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export { lightTheme, darkTheme };
