import { Box, Typography, Container } from '@mui/material';
import StepsByPage from '../../theoremData';

function LearnMenu() {

    const pages = StepsByPage.map(theorem => ({
        name: theorem.theoremName,
        link: `/learn/${theorem.theoremNameSlug}`
    }));

    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom color="var(--color-text-primary)">
                Theorems
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 2,
            }}>
                {pages.map((item, index) => (
                    <Box
                        key={index}
                        component="a"
                        href={item.link}
                        sx={{
                            bgcolor: 'secondary.main',
                            color: 'secondary.contrastText',
                            p: 2,
                            borderRadius: 1,
                            textAlign: 'center',
                            textDecoration: 'none',
                            '&:hover': {
                                bgcolor: 'secondary.dark',
                                boxShadow: 1,
                            },
                            fontSize: '2rem',
                        }}
                    >
                        {item.name}
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default LearnMenu;