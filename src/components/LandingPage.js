import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";

function LandingPage() {
    const navigate = useNavigate();

    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Box sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text-primary)'
        }}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    fullScreen: {
                        enable: false,
                        zIndex: -1
                    },
                    background: {
                        color: {
                            value: 'var(--color-paper)',
                        },
                    },
                    particles: {
                        color: {
                            value: 'var(--color-node-fill)',
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: {
                                default: "bounce",
                            },
                        },
                        number: {
                            value: 30,
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                        },
                        opacity: {
                            value: 0.7,
                        },
                        size: {
                            value: { min: 3, max: 8 },
                        },
                        links: {
                            enable: true,
                            distance: 150,
                            color: 'var(--color-edge-default)',
                            opacity: 0.4,
                            width: 1,
                        },
                    },
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <Container
                maxWidth="md"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    color: 'var(--color-text-primary)'
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
                    <Typography variant="h2" component="h1" gutterBottom>
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