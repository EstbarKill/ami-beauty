export default function ChromaticPalette() {
  const colors = [
    "#FBE5D6",
    "#F5D0B5",
    "#E6B48D",
    "#D1966C",
    "#B8784C",
    "#925C37",
    "#6A4227",
    "#3E2517",
  ];

  return (
    <div style={{color:"red", background:"var(--rose-lith)", border:"3px solid var(--cream-dark)", boxShadow:"0 6px 10px rgba(24, 12, 2, .7)"}}className="p-3 rounded">
      <h3 className="text-black text-lg font-semibold mb-3">
        Guía Cromática Ami Beauty
      </h3>

      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <div
            key={color}
            style={{
              background: color,
              height: "60px",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
    </div>
  );
}