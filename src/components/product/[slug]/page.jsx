import { products } from "@/lib/products";

export default function ProductPage({ params }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return <div className="p-10">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          className="w-full rounded"
        />

        <div>
          <h1 className="section-title mb-4">{product.name}</h1>

          <p className="text-muted mb-2">{product.catLabel}</p>

          <p className="text-2xl mb-6">${product.price}</p>

          <button className="btn-primary w-full mb-3">
            Agregar al carrito
          </button>

          <button className="btn-outline w-full">
            Guardar en favoritos
          </button>
        </div>

      </div>
    </div>
  );
}