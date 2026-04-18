import products from "@/data/products.json"
import ProductGrid from "../product/ProductGrid"

export default function FeaturedProducts() {
  const featured = products.filter(p => p.featured)

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">

      <h2 className="text-2xl font-bold mb-6">
        Productos destacados
      </h2>

      <ProductGrid products={featured} />

    </section>
  )
}