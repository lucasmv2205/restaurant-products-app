import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Palette {
    green: string[];
    gray: string[];
    darkGray: string[];
    orange: string[];
    white: string;
    black: string;
  }
  interface PaletteOptions {
    green: string[];
    gray: string[];
    darkGray: string[];
    orange: string[];
    white: string;
    black: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA291C",
      light: "#B22217",
      dark: "#C7241D",
    },
    secondary: {
      main: "#FFC72C",
      light: "#FFB800",
      dark: "#FFB81C",
      contrastText: "#E0A800",
    },
    gray: ["#B0B0B0", "#FFF8E1", "#FFF3D9"],
    darkGray: ["#27251F"],
    green: ["#28A745"],
    orange: ["#FF9C00"],
    white: "#FFF",
    black: "#000",
  }
});


export default theme;
