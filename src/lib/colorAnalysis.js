// RGB → XYZ → LAB
function rgbToLab(r, g, b) {
  r /= 255; g /= 255; b /= 255;

  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

  const fx = x > 0.008856 ? Math.cbrt(x) : (7.787 * x + 16 / 116);
  const fy = y > 0.008856 ? Math.cbrt(y) : (7.787 * y + 16 / 116);
  const fz = z > 0.008856 ? Math.cbrt(z) : (7.787 * z + 16 / 116);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b2 = 200 * (fy - fz);

  return { L, a, b: b2 };
}

// ITA REAL
export function calculateITA(L, b) {
  return Math.atan((L - 50) / b) * (180 / Math.PI);
}