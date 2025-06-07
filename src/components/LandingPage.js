import { Box, Button, Typography, Container, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom color="text.primary">
                    Ramsey Theory Visualizer
                </Typography>

                <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
                    Explore and understand Ramsey theory through interactive visualization
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/sandbox')}
                        sx={{ minWidth: 200 }}
                    >
                        Sandbox
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/learnmenu')}
                        sx={{ minWidth: 200 }}
                    >
                        Learn
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingPage;