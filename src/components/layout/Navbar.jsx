import Link from "next/link"

const categories = ["rostro", "ojos", "labios", "cuidado"]

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 flex gap-6 py-2">
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/category/${cat}`}
            className="capitalize hover:text-pink-500 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  )
}