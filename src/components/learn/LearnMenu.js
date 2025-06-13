import { Box, Typography, Container, Button } from '@mui/material';
import StepsByPage from '../../theoremData';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import AppBar from '../shared/AppBar';

function LearnMenu() {
    const navigate = useNavigate();

    const pages = StepsByPage.map(theorem => ({
        name: theorem.theoremName,
        link: `/learn/${theorem.theoremNameSlug}`
    }));

    return (
        <>
            <AppBar returnPath="/" titleText="Theorems" />
            <Container>
                <Box sx={{ height: '20px' }} />
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 2,
                }}>
                    {pages.map((item, index) => (
                        <Button
                            variant="contained"
                            key={index}
                            size="large"
                            onClick={() => navigate(item.link)}
                            sx={{
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <Typography variant="h4"><InlineMath >{item.name}</InlineMath></Typography>
                        </Button>
                    ))}
                </Box>
            </Container>
        </>
    );
}

export default LearnMenu;