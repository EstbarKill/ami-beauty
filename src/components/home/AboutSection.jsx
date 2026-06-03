import Link from "next/link";

export default function AboutSection() {
  return (
    <section style={{ background: "white", padding: "2rem 5rem" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
        }}
      >
        {/* Image stack */}
        <div style={{ position: "relative", minHeight: "480px" }}>
          {/* Main block */}
          <div
            style={{
              width: "50%",
              aspectRatio: "0.82",
              backgroundImage: `url("/img/ami.jpg")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              padding: "2rem",
              border: "5px solid var(--rose)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "6rem",
                color: "rgba(255,255,255)",
                textShadow: "5px 5px 0 black",
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
              width: "30%",
              aspectRatio: "0.85",
              backgroundImage: `url("/img/beauty.png")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              position: "absolute",
              top: "50%",
              right: "36%",
              border: "5px solid var(--rose)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "1rem",
            }}
          >
          </div>

          {/* Decorative dot */}
          <div
            style={{
              position: "absolute",
              top: "13rem",
              right: "40%",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundImage: `url("/img/dot.png")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Text */}
        <div>
          <span className="eyebrow">Sobre Nosotras</span>
          <h2
            className="section-title"
            style={{
              marginBottom: ".5rem",
              color: "var(--charcoal)",
              fontFamily: "var(--font-display)",
            }}
          >
            Elevando el lujo, redefiniendo la elegancia
          </h2>
          <p
            style={{
              color: "var(--charcoal-mid)",
              lineHeight: "1.50rem",
              fontSize: "15px",
              marginBottom: ".6rem",
              marginLeft: "0.30rem",
              fontFamily: "var(--font-body)",
            }}
          >
            En Ami Beauty nos dedicamos a ofrecer los mejores productos de
            belleza y cosmética de lujo. Nuestro objetivo es crear una
            experiencia de compra que refleje los más altos estándares de
            calidad — desde formulaciones científicamente avanzadas hasta
            empaques sostenibles.
          </p>
          <p
            style={{
              color: "var(--charcoal-mid)",
              lineHeight: "1.5",
              fontSize: "15px",
              marginBottom: ".6rem",
              marginLeft: "0.30rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Cada producto en nuestra tienda ha sido cuidadosamente seleccionado.
            Usamos tecnología de inteligencia artificial para ayudarte a
            encontrar los productos perfectos para tu tono de piel exacto —
            Fitzpatrick I hasta VI.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: ".5rem 0",
              borderTop: "1px solid var(--cream-dark)",
              borderBottom: "1px solid var(--cream-dark)",
              marginBottom: "1rem",
              justifyContent: "center",
              gap: "7rem",
              fontFamily: "var(--font-body)",
              textAlign: "center",
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
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: "var(--rose-dark)",
                    lineHeight: 1,
                    marginBottom: ".5rem",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted-dark)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
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
