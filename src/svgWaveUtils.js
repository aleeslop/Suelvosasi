/**
 * Shared SVG arc geometry utilities for Suelvo's interconnected circular node chains.
 */

export const BOTTOM_SEGMENTS = [
  [177, 123],
  [117, 63],
  [57, 3],
];

export const TOP_SEGMENTS = [
  [183, 237],
  [243, 297],
  [303, 357],
];

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const rad = (angleInDegrees * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

/**
 * Generates an SVG arc path string centered at (cx, cy) with radius r.
 * Supports both clockwise (endAngle >= startAngle) and counter-clockwise arcs.
 */
export function describeArcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';
  const sweepFlag = endAngle >= startAngle ? '1' : '0';
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

