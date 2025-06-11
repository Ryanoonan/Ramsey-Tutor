

export const lerp = (start, end, t) => start + t * (end - start);

export const lerpColor = (color1, color2, t) => {
    const parseColor = (color) => {
        const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
        if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1], 10);
            const g = parseInt(rgbaMatch[2], 10);
            const b = parseInt(rgbaMatch[3], 10);
            const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1.0;
            return [r, g, b, a];
        }
        throw new Error(`Invalid color format: ${color}`);
    };

    const [r1, g1, b1, a1] = parseColor(color1);
    const [r2, g2, b2, a2] = parseColor(color2);

    const r = Math.round(lerp(r1, r2, t));
    const g = Math.round(lerp(g1, g2, t));
    const b = Math.round(lerp(b1, b2, t));
    let a = lerp(a1, a2, t);

    if (a < 0.01) {
        a = 0; // prevent scientific notation for very small alpha values
    }

    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const easeInOutCubic = (t) => {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const applyOpacity = (color, opacity) => {
    if (color.startsWith('rgb')) { //TODO: Remove this check, and make sure we 
        // use the edge default color instead of hardcoding values
        if (color.startsWith('rgba')) {
            // Replace the existing alpha value
            return color.replace(/rgba\((.+?),\s*[\d.]+\)/, `rgba($1, ${opacity})`);
        }
        return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
    }

    // Fallback to black with opacity if all else fails
    return `rgba(0, 0, 0, ${opacity})`;
};
