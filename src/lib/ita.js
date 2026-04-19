export function calculateITA(L, b) {
  return Math.atan((L - 50) / b) * (180 / Math.PI);
}

export function classifyITA(ita) {
  if (ita > 55) return { label: "Muy claro", group: "light" };
  if (ita > 41) return { label: "Claro", group: "light" };
  if (ita > 28) return { label: "Intermedio claro", group: "medium-light" };
  if (ita > 10) return { label: "Intermedio", group: "medium" };
  if (ita > -30) return { label: "Moreno", group: "medium-dark" };
  return { label: "Oscuro", group: "dark" };
}