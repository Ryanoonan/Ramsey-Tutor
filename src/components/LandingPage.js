import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container
                maxWidth="md"
                sx={{
                    color: 'var(--color-text-secondary)'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    <Typography variant="h2" component="h1" gutterBottom color="var(--color-text-primary)">
                        Ramsey Theory Visualizer
                    </Typography>

                    <Typography variant="h5" component="h2" gutterBottom color="var(--color-text-secondary)">
                        Explore and understand Ramsey theory through interactive visualization
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/sandbox')}
                            sx={{ minWidth: 200 }}
                        >
                            Sandbox Mode
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/learn')}
                            sx={{ minWidth: 200 }}
                        >
                            Learn Mode
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default LandingPage;