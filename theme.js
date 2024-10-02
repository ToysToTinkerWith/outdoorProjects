import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: "#675252",
    },
    secondary: {
      main: "#E5650F",
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  
})

theme = responsiveFontSizes(theme)

export default theme