import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define your custom theme
// Padding 0 et margin 0 pour enlever les marges par défaut
const theme = createTheme({
    global: {
        html: {
            padding: 0,
            margin: 0
        },
        body: {
            padding: 0,
            margin: 0
        }
    },
    typography: {
        fontFamily: 'Arial' 
    },
    palette: {
        primary: {
            main: '#457b9d', // Replace with your desired primary color
        },
        secondary: {
            main: '#00ff00', // Replace with your desired secondary color
        },
    },
});

export default function CustomThemeProvider({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
