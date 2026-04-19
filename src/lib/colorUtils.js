export function rgbToXyz(r, g, b) {
  r /= 255; g /= 255; b /= 255;

  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

  return [
    (r * 0.4124 + g * 0.3576 + b * 0.1805) * 100,
    (r * 0.2126 + g * 0.7152 + b * 0.0722) * 100,
    (r * 0.0193 + g * 0.1192 + b * 0.9505) * 100
  ];
}

export function xyzToLab(x, y, z) {
  const refX = 95.047;
  const refY = 100;
  const refZ = 108.883;

  x /= refX; y /= refY; z /= refZ;

  const f = (t) =>
    t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116);

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return [
    (116 * fy) - 16,
    500 * (fx - fy),
    200 * (fy - fz)
  ];
}