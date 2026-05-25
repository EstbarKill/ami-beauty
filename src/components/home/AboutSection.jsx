import Link from "next/link";

export default function AboutSection() {
  return (
    <section style={{ background: "white", padding: "4rem 4rem" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "2rem",
        }}
      >
        {/* Image stack */}
        <div style={{ position: "relative", minHeight: "480px" }}>
          {/* Main block */}
          <div
            style={{
              width: "60%",
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
                fontFamily: "Georgia,serif",
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
              right: "20%",
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
              top: "11rem",
              right: "20%",
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
              marginBottom: "1rem",
              color: "var(--charcoal)",
              marginTop: "0.25rem",
            }}
          >
            Elevando el lujo, redefiniendo la elegancia
          </h2>
          <p
            style={{
              color: "var(--charcoal-mid)",
              lineHeight: "1.50rem",
              fontSize: "15px",
              marginBottom: "1.25rem",
              marginLeft: "0.25rem",
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
              lineHeight: "1.95",
              fontSize: "15px",
              marginBottom: "1.25rem",
              marginLeft: "0.25rem",
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
              gap: "2.5rem",
              padding: "1.5rem 0",
              borderTop: "2px solid var(--cream-dark)",
              borderBottom: "2px solid var(--cream-dark)",
              marginBottom: "2rem",
              justifyContent: "center",
              gap: "10rem",
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
                    fontSize: "1.8rem",
                    color: "var(--rose-dark)",
                    lineHeight: 1,
                    marginBottom: ".5rem",
                    justifySelf: "center",
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
