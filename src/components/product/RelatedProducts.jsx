import ProductGrid from "./ProductGrid";

export default function RelatedProducts({ products }) {
  return <ProductGrid products={products} loading={false} />;
}
