import products from "@/data/products.json";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="p-10">Producto no encontrado</div>;
  }

  return (
    <div className="p-6 md:p-10">
      <ProductDetail product={product} />
    </div>
  );
}