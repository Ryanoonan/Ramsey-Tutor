



import { AppBar as MuiAppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { InlineMath, BlockMath } from 'react-katex';

function AppBar({ returnPath, titleText, formatMath }) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <MuiAppBar position="static" sx={{ bgcolor: theme.palette.background.paper }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '150px' }}>
                    <Button color="inherit" onClick={() => navigate(returnPath)} sx={{ mr: 2 }}>
                        Back
                    </Button>
                </Box>
                <Typography variant="h2" component="div" sx={{ flexGrow: 0, textAlign: 'center' }}>
                    {formatMath ? <InlineMath>{titleText}</InlineMath> : titleText}
                </Typography>
                <Box sx={{ width: '150px' }}></Box>
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar;

