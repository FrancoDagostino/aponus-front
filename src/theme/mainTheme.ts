import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";


export const mainTheme = createTheme({
    palette: {
        primary: {
            main: "#123A6D"
        },
        success: {
            main: blue[500], // Color principal para success
            contrastText: '#fff', // Color del texto para success
        },
        secondary: {
            main: "#C09E78",
        },
        // error: {

        // },
        // info: {

        // }
    },
    // components: {
    //     MuiButton: {
    //         styleOverrides: {
    //             root: {
    //                 '&.MuiButton-containedSecondary': {
    //                 },
    //                 '&.MuiButton-outlinedSuccess': {
    //                     '&:hover': {
    //                         borderColor: '#388e3c', // Color del borde al hover para variant="outlined" success
    //                         color: '#388e3c', // Color del texto al hover para variant="outlined" success
    //                     },
    //                 },
    //                 '&.MuiButton-textSuccess': {
    //                     '&:hover': {
    //                         backgroundColor: 'rgba(56, 142, 60, 0.04)', // Color de fondo al hover para variant="text" success
    //                         color: '#388e3c', // Color del texto al hover para variant="text" success
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // },
});