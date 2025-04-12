// Color values
const colorValues = {
    background: '#1a1a1a',
    paper: '#1a1a1a',
    nodeFill: '#1a237e',
    nodeBorder: '#ffffff',
    edgeDefault: '#ffffff',
    edgeRed: '#ff0000',
    edgeBlue: '#0000ff',
    textPrimary: '#ffffff',
    textSecondary: '#e0e0e0',
};

// CSS variable references
export const cssColors = {
    background: 'var(--color-background)',
    paper: 'var(--color-paper)',
    node: {
        fill: 'var(--color-node-fill)',
        border: 'var(--color-node-border)',
        borderWidth: 2,
    },
    edge: {
        default: 'var(--color-edge-default)',
        red: 'var(--color-edge-red)',
        blue: 'var(--color-edge-blue)',
    },
    text: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
    }
};

// Direct color values for MUI theme
export const colors = {
    background: colorValues.background,
    paper: colorValues.paper,
    node: {
        fill: colorValues.nodeFill,
        border: colorValues.nodeBorder,
        borderWidth: 2,
    },
    edge: {
        default: colorValues.edgeDefault,
        red: colorValues.edgeRed,
        blue: colorValues.edgeBlue,
    },
    text: {
        primary: colorValues.textPrimary,
        secondary: colorValues.textSecondary,
    }
};

export default colors;
