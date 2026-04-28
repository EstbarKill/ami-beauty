function clamp(value, min = 0, max = 255) {
  return Math.max(min, Math.min(max, value));
}

export function adjustColor(rgb, factor) {
  return rgb.map((c) => clamp(c + factor));
}

export function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  let r, g, b;
  if (Array.isArray(rgb)) [r, g, b] = rgb;
  else { r = rgb.r; g = rgb.g; b = rgb.b; }

  r = Number.isFinite(r) ? Math.round(r) : 0;  // ← Math.round()
  g = Number.isFinite(g) ? Math.round(g) : 0;
  b = Number.isFinite(b) ? Math.round(b) : 0;

  return "#" + [r, g, b]
    .map(x => clamp(x, 0, 255).toString(16).padStart(2, "0"))
    .join("");
}

export function generateToneVariants(rgb) {
  const light = adjustColor(rgb, 25);
  const dark = adjustColor(rgb, -25);

  return [
    {
      id: "light",
      tone: "light",
      label: "Claro",
      hex: rgbToHex(light),
    },
    {
      id: "mid",
      tone: "mid",
      label: "Exacto",
      hex: rgbToHex(rgb),
    },
    {
      id: "dark",
      tone: "dark",
      label: "Oscuro",
      hex: rgbToHex(dark),
    },
  ];
}