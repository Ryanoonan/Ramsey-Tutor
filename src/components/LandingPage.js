import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    if (isMobile) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                textAlign: 'center',
            }}>
                <h2>This site is designed for desktop browsers.</h2>
                <p>For the best experience, please visit on a larger screen.</p>
            </div>
        );
    }

    return (

        <Box sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: theme.palette.background,
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
                        onClick={() => navigate('/learnmenu')}
                        sx={{ minWidth: 200 }}
                    >
                        Learn
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/background')}
                        sx={{ minWidth: 200 }}
                    >
                        Background
                    </Button>
                </Box>
            </Box>
        </Box >
    );
}

export default LandingPage;