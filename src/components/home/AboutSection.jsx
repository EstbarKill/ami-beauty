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
              top: "40%",
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
              top: "17.2rem",
              right: "39%",
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
          <span
          style={{ fontSize:"1.2rem",color:"var(--font-primary)"}}>Ami es esa amiga.</span>
          <p
            style={{
              color: "var(--font-primary)",
              lineHeight: "1.50rem",
              fontSize: "1.1rem",
              marginBottom: ".6rem",
              fontFamily: "var(--font-body)",
            }}
          >
            
La que te dice la verdad aunque no sea lo que querías escuchar. La que sabe de maquillaje y no te deja comprar el tono incorrecto. La que entiende tu piel, tu tono, tu subtono y te orienta sin juzgarte ni confundirte.
Esa amiga que todas necesitamos cuando estamos frente a una pantalla, sin poder probarnos nada, intentando adivinar si ese corrector es realmente el nuestro.
Al construir este emprendimiento de marcas colombianas de maquillaje apareció algo que lo cambió todo: en Colombia no existía una herramienta digital confiable que ayudara a la consumidora a encontrar su tono sin prueba física. Las plataformas internacionales tienen sus sistemas, sí pero construidos desde referencias que no nos representan, que no conocen a Majikal ni saben qué es un subtono oliva en una piel mestiza colombiana.
Ahí estaba la oportunidad. Y de ahí nació esto.
Ami Beauty: una plataforma de comercio electrónico especializada en marcas colombianas de maquillaje, con un diagnóstico cromático asistido que lee tu tono real y te recomienda el corrector que tiene sentido para tu piel. Sin adivinar. Sin devolver. Sin incertidumbre.
Como lo haría una buena amiga.
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
                    fontSize: "13px",
                    color: "var(--surface)",
                    letterSpacing: "0.03em",
                    fontWidth:900,
                    textTransform: "uppercase",
                    fontFamily:"var(--font-display)"
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
