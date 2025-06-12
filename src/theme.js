import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: 'rgb(243, 251, 255)',
            main: 'rgb(195, 236, 255)',
            dark: 'rgb(3, 155, 229)',
            contrastText: 'rgb(0, 0, 0)'
        },
        secondary: {
            main: 'rgb(196, 212, 251)'
        },
        background: {
            default: 'rgb(255, 255, 255)',
            paper: 'rgb(227, 242, 253)'
        },
        text: {
            primary: 'rgb(0, 0, 0)',
            secondary: 'rgb(56, 56, 56)'
        },
        custom: {
            nodeBorder: 'rgb(13, 71, 161)',
            nodeFill: 'rgb(179, 229, 252)',
            edgeDefault: 'rgba(1,1,1,1)',
            edgeRed: 'rgba(255,0,0,1)',
            edgeBlue: 'rgba(0,0,255,1)'
        }
    }
});

export default theme;
