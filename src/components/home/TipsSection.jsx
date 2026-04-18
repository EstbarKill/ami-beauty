import tips from "@/data/tips"
import Link from "next/link"

export default function TipsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">

      <h2 className="text-2xl font-bold mb-6">
        Consejos de belleza
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {tips.slice(0, 3).map(t => (
          <Link key={t.slug} href={`/tips/${t.slug}`}>
            <div className="card cursor-pointer">
              {t.title}
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}