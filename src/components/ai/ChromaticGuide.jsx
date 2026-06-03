export default function ChromaticGuide() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        border: "2px dashed rgba(255,255,255,.4)",
      }}
    >
      {/* Rostro */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: "translate(-50%,-50%)",
          width: "140px",
          height: "180px",
          border: "2px solid #22c55e",
          borderRadius: "100px",
        }}
      />

      {/* Tarjeta */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "30px",
          width: "100px",
          height: "70px",
          border: "2px solid #f59e0b",
          background: "rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            height: "100%",
          }}
        >
          <div style={{ background: "#f5f5f5" }} />
          <div style={{ background: "#808080" }} />
          <div style={{ background: "#202020" }} />

          <div style={{ background: "#DCAA82" }} />
          <div style={{ background: "#BE8C8C" }} />
          <div style={{ background: "#A57C65" }} />
        </div>
      </div>
    </div>
  );
}