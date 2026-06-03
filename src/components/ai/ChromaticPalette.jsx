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
    <div className="bg-white p-4 rounded">
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

      <p className="text-xs text-gray-600 mt-3">
        Para una mejor referencia visual.
      </p>
    </div>
  );
}