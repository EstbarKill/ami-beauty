import Link from "next/link";

export default function AboutSection() {
  return (
    <section style={{ background: "white", padding: "6rem 3rem" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        {/* Image stack */}
        <div style={{ position: "relative", minHeight: "460px" }}>
          <div
            style={{
              width: "80%",
              aspectRatio: ".8",
              background: "linear-gradient(135deg,#C9957A 0%,#8B5E4A 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "Georgia,serif", fontSize: "3.5rem", color: "rgba(255,255,255,.2)", fontStyle: "italic" }}>
              Ami
            </span>
          </div>
          <div
            style={{
              width: "45%",
              aspectRatio: ".8",
              background: "linear-gradient(135deg,#EDD9CC 0%,#C9957A 100%)",
              position: "absolute",
              bottom: "-2rem",
              right: 0,
              border: "4px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "Georgia,serif", fontSize: "1.4rem", color: "rgba(255,255,255,.4)", fontStyle: "italic" }}>
              Beauty
            </span>
          </div>
        </div>

        {/* Text */}
        <div>
          <span className="eyebrow">Sobre Nosotras</span>
          <h2
            className="section-title"
            style={{ marginBottom: "1.25rem", color: "var(--charcoal)" }}
          >
            Elevando el lujo, redefiniendo la elegancia
          </h2>
          <p
            style={{
              color: "var(--charcoal-mid)",
              lineHeight: "1.9",
              fontSize: "14px",
              marginBottom: "1.25rem",
            }}
          >
            En Ami Beauty nos dedicamos a ofrecer los mejores productos de belleza y
            cosmética de lujo. Nuestro objetivo es crear una experiencia de compra que
            refleje los más altos estándares de calidad — desde formulaciones
            científicamente avanzadas hasta empaques sostenibles.
          </p>
          <p
            style={{
              color: "var(--charcoal-mid)",
              lineHeight: "1.9",
              fontSize: "14px",
              marginBottom: "2rem",
            }}
          >
            Cada producto en nuestra tienda ha sido cuidadosamente seleccionado. Usamos
            tecnología de inteligencia artificial para ayudarte a encontrar los productos
            perfectos para tu tono de piel exacto — Fitzpatrick I hasta VI.
          </p>
          <Link href="/category/todos" className="btn-outline">
            Explorar Colección
          </Link>
        </div>
      </div>
    </section>
  );
}
