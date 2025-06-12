
import { Box, Typography, Container, Toolbar, Button } from '@mui/material';
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
                        In graph theory, precise definitions are essential for understanding complex concepts. A <strong>complete graph</strong> on
                        <InlineMath>{" \\ n "}</InlineMath> vertices, denoted <InlineMath>{"K_n"}</InlineMath>, is a graph where every pair of distinct
                        vertices is connected by exactly one edge. For example, <InlineMath>{"K_3"}</InlineMath> is a triangle, and <InlineMath>{"K_4 \\ "}</InlineMath>
                        is a tetrahedron when viewed in 3D.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        An <strong>infinite complete graph</strong>, denoted <InlineMath>{"K_{\\infty}"}</InlineMath>, is the complete graph with a countably
                        infinite number of vertices. In this graph, every vertex is connected to every other vertex, resulting in an infinite number of edges.
                        In the context of Ramsey Theory, <InlineMath>{"K_{\\infty}"}</InlineMath> is particularly important for examining properties that hold
                        regardless of the size of the graph, leading to results in infinite Ramsey theory.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <BlockMath>{"K_n = (V, E) \\text{ where } |V| = n \\text{ and } E = \\{(i,j) : i,j \\in V, i \\neq j\\}"}</BlockMath>
                    </Box>
                </Box>

                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Graph Theory Fundamentals
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        Graph theory is the study of graphs, mathematical structures used to model pairwise relations between objects.
                        A graph consists of vertices (or nodes) connected by edges. In the context of Ramsey Theory, we often work with
                        complete graphs <InlineMath>{"K_n"}</InlineMath>, where every pair of distinct vertices is connected by a unique edge.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        When edges in a graph are colored (typically with two colors like red and blue), we look for monochromatic substructures—
                        subgraphs where all edges have the same color. For example, a monochromatic triangle in a 2-colored complete graph
                        <InlineMath>{"\\ K_6"}</InlineMath> consists of three vertices where all three connecting edges have the same color.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <BlockMath>{"R(3,3) = 6"}</BlockMath>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        This equation states that any 2-coloring of the edges of <InlineMath>{"K_6"}</InlineMath> must contain a monochromatic triangle.
                    </Typography>
                </Box>

                <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Proof by Contradiction
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        Proof by contradiction is a fundamental technique in mathematical reasoning. The approach begins by assuming the opposite
                        of what we want to prove, and then showing that this assumption leads to a logical contradiction.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        For example, to prove that <InlineMath>{"R(3,3) = 6"}</InlineMath>, we might assume there exists a 2-coloring of
                        <InlineMath>{"\\ K_6"}</InlineMath> with no monochromatic triangles. By exploring the consequences of this assumption,
                        we can demonstrate that it leads to an impossible situation, thus proving our original claim.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <BlockMath>{"P \\Rightarrow (Q \\land \\neg Q) \\Rightarrow \\neg P"}</BlockMath>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        This logical formula represents proof by contradiction: if assuming P leads to both Q and not-Q (a contradiction),
                        then P must be false.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="text.primary" sx={{ textAlign: 'center' }}>
                        Pigeonhole Principle
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        The pigeonhole principle states that if <InlineMath>{"n"}</InlineMath> items are placed into <InlineMath>{"m"}</InlineMath> containers,
                        with <InlineMath>{"n > m"}</InlineMath>, then at least one container must contain more than one item.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        In Ramsey Theory, this principle is often used to show that certain patterns must exist. For instance, when coloring edges
                        of <InlineMath>{"K_6"}</InlineMath> with two colors, each vertex has five incident edges. By the pigeonhole principle, at least
                        three of these edges must have the same color, which forms the basis for finding monochromatic triangles.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <BlockMath>{"\\text{If } n > mk \\text{, then at least one of } m \\text{ containers has } > k \\text{ items}"}</BlockMath>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
                        This generalized pigeonhole principle is particularly useful in combinatorial proofs in Ramsey Theory and helps establish
                        the existence of specific structures in colored graphs.
                    </Typography>
                </Box>
            </Container>
        </>
    );
}

export default Background;