



import { AppBar as MuiAppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { InlineMath } from 'react-katex';

function AppBar({ returnPath, titleText, formatMath }) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <MuiAppBar position="static" sx={{ bgcolor: theme.palette.background.paper, height: '13vh' }}>
            <Toolbar
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center', // center children by default
                    height: '100%',
                    px: 2,
                }}
            >
                <Box sx={{ position: 'absolute', left: 16 }}>
                    <Button color="inherit" onClick={() => navigate(returnPath)} sx={{ fontSize: '1.4rem' }}>
                        Back
                    </Button>
                </Box>
                <Typography variant="h2" component="div" textAlign='center' >
                    {formatMath ? <InlineMath>{titleText}</InlineMath> : titleText}
                </Typography>
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar;

