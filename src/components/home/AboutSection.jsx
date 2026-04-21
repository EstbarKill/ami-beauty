import Link from "next/link";

export default function AboutSection() {
  return (
    <section style={{ background: "white", padding: "7rem 3rem" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "7rem",
          alignItems: "center",
        }}
      >
        {/* Image stack */}
        <div style={{ position: "relative", minHeight: "480px" }}>
          {/* Main block */}
          <div
            style={{
              width: "78%",
              aspectRatio: "0.82",
              backgroundImage: `url("/ami-beauty/img/ami.jpg")`,
                            backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              padding: "1.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "5rem",
                marginBottom:"-2rem",
                color: "rgba(230,21,193, 1)",
                fontStyle: "italic",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              Ami
            </span>
          </div>

          {/* Floating accent block */}
          <div
            style={{
              width: "46%",
              aspectRatio: "0.85",
              backgroundImage: `url("/ami-beauty/img/beauty.png")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: "absolute",
              bottom: "-2rem",
              right: 0,
              border: "5px solid white",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "Georgia,serif",
                fontSize: "1.2rem",
                color: "rgba(230,21,193, 1)",
                marginBottom:"-1rem",
                fontStyle: "italic",
                userSelect: "none",
              }}
            >
              Beauty
            </span>
          </div>

          {/* Decorative dot */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "22%",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundImage: `url("/ami-beauty/img/dot.png")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Text */}
        <div>
          <span className="eyebrow">Sobre Nosotras</span>
          <h2
            className="section-title"
            style={{ marginBottom: "1.5rem", color: "var(--charcoal)", marginTop: "0.25rem" }}
          >
            Elevando el lujo, redefiniendo la elegancia
          </h2>
          <p
            style={{
              color: "var(--charcoal-mid)",
              lineHeight: "1.95",
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
              lineHeight: "1.95",
              fontSize: "14px",
              marginBottom: "2.25rem",
            }}
          >
            Cada producto en nuestra tienda ha sido cuidadosamente seleccionado. Usamos
            tecnología de inteligencia artificial para ayudarte a encontrar los productos
            perfectos para tu tono de piel exacto — Fitzpatrick I hasta VI.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              padding: "1.5rem 0",
              borderTop: "1px solid var(--cream-dark)",
              borderBottom: "1px solid var(--cream-dark)",
              marginBottom: "2rem",
            }}
          >
            {[
              { n: "+2.400", label: "Clientas satisfechas" },
              { n: "11", label: "Tonos clasificados" },
              { n: "100%", label: "Privado · Sin servidor" },
            ].map(({ n, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: "1.6rem",
                    color: "var(--rose)",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {n}
                </div>
                <div style={{ fontSize: "10.5px", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <Link href="/category/todos" className="btn-outline">
            Explorar Colección
          </Link>
        </div>
      </div>
    </section>
  );
}