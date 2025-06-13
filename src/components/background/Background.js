
import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import AppBar from '../shared/AppBar';

function Background() {
    const theme = useTheme();
    return (
        <>
            <AppBar returnPath="/" titleText="Background" />
            <Box sx={{ height: '20px' }} />
            <Container maxWidth="md" sx={{ py: 4, backgroundColor: theme.palette.primary.light }}>

                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 3, }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Key Definitions
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        A <strong> graph </strong> is a collection of vertices (or nodes) connected by edges.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        A <strong>complete graph</strong> on
                        <InlineMath>{" \\ n "}</InlineMath> vertices, denoted <InlineMath>{"K_n"}</InlineMath>, is a graph where every pair of distinct
                        vertices is connected by exactly one edge. For example, <InlineMath>{"K_2"}</InlineMath> is a a segment between 2 points, and <InlineMath>{"K_3 \\ "}</InlineMath>
                        is a triangle. We will see some examples of complete graphs in the theorems.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        An <strong>infinite complete graph</strong>, denoted <InlineMath>{"K_{\\infty}"}</InlineMath>, is the complete graph with a countably
                        infinite number of vertices. In this graph, every vertex is connected to every other vertex, resulting in an infinite number of edges.
                    </Typography>


                </Box>

                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Ramsey Theory Definitions.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        Ramsey Theory is a essentially asks the question: "How large must a structure be to guarantee a certain property?". We define the <strong>ramsey number</strong> <InlineMath>{"R(n)"}</InlineMath>
                        as the smallest number of vertices such that if you take a graph with <InlineMath>{"R(n)"}</InlineMath> vertices, and color its edges with two colors (say red and blue), then you are guaranteed to find a complete subgraph of size <InlineMath>{"n"}</InlineMath> in one of the colors.
                        For example, the Ramsey number <InlineMath>{"R(3) = 6"}</InlineMath> (We will prove this), means that if you color <InlineMath>{"K_6"}</InlineMath> with two colors, you are guaranteed to find a monochromatic triangle (a red or blue triangle).
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        You may also see a ramsey number denoted as <InlineMath>{"R(k,l)"}</InlineMath>, which is the smallest number of vertices such that if you take a graph with <InlineMath>{"R(k,l)"}</InlineMath> vertices, and color its edges with two colors (say red and blue), then you are
                        guaranteed to find a complete subgraph of size <InlineMath>{"k"}</InlineMath> in one color or a complete subgraph of size <InlineMath>{"l"}</InlineMath> in the other color.
                    </Typography>

                </Box>

                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Proof by Contradiction
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        <strong>Proof by contradiction</strong> is a fundamental technique in mathematical reasoning. The approach begins by assuming the opposite
                        of what we want to prove, and then showing that this assumption leads to a logical contradiction.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        For example, to prove that <InlineMath>{"R(3) = 6"}</InlineMath>, we might assume there exists a 2-coloring of
                        <InlineMath>{"\\ K_6"}</InlineMath> with no monochromatic triangles. When we try to color the edges without forming a monochromatic triangle,
                        either we form one (Contradicting our original assumption that there is such a coloring), or we find some other contradiction. Either way, this
                        proves that our original assumption must be false.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <BlockMath>{"P \\Rightarrow (Q \\land \\neg Q) \\Rightarrow \\neg P"}</BlockMath>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        The above formula represents proof by contradiction: if assuming P leads to both Q and not-Q (a contradiction),
                        then P must be false.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Pigeonhole Principle
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        The <strong>pigeonhole principle</strong> states that if <InlineMath>{"n"}</InlineMath> items are placed into <InlineMath>{"m"}</InlineMath> containers,
                        with <InlineMath>{"n > m"}</InlineMath>, then at least one container must contain more than one item. For example, if you have 10 pairs of socks and only 4 drawers,
                        at least one drawer must contain more than 2 pairs of socks.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <BlockMath>{"\\text{If } n > mk \\text{, then at least one of } m \\text{ containers has } > k \\text{ items}"}</BlockMath>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        The <strong> infinite pigeonhole principle</strong> extends the basic idea of the pigeonhole principle to infinite sets. It states that if you have an infinite number of items and a finite number of containers, then at least one container must hold an infinite number of items.
                        (This can be proven by contradiction, give it a try!)
                    </Typography>
                </Box>
            </Container>
        </>
    );
}

export default Background;