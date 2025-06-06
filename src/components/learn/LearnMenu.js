import { Box, Typography, Container } from '@mui/material';

function LearnMenu() {

    const pages = [
        { name: 'R(3) = 3', link: '/learn/r3-3' },
        { name: 'Item 2', link: '/learn/item-2' },
        { name: 'Item 3', link: '/learn/item-3' },
        { name: 'Item 4', link: '/learn/item-4' },
    ];

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