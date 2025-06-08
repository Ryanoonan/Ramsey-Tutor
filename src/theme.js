import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'rgb(26, 41, 126)',
        },
        secondary: {
            main: 'rgba(255, 255, 255, 1)',
        },
        background: {
            default: 'rgb(255, 255, 255)',
            paper: 'rgb(172, 172, 172)',
        },
        text: {
            primary: 'rgb(0, 0, 0)',
            secondary: 'rgb(69, 69, 69)',
        },
        custom: {
            nodeBorder: 'rgb(0, 0, 0)',
            nodeFill: 'rgb(179, 195, 253)',
            edgeDefault: 'rgba(1, 1, 1,1)',
            edgeRed: 'rgba(255, 0, 0, 1)',
            edgeBlue: 'rgba(0, 0, 255, 1)',
        }
    }
});

export default theme;