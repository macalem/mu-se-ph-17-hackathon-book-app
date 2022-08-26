import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    palette: {
        primary: {
            main: '#031424'
        },
        secondary: {
            main: '#30415D'
        },
        error: {
            main: '#CF6766'
        },
        warning: {
            main: '#FFD357'
        }
    }
})

export default Theme;