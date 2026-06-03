import { CATEGORY_TREE } from "./categories";

export function resolveCategory(product) {
  for (const [key, category] of Object.entries(CATEGORY_TREE)) {
    if (category.subcategories.includes(product.category)) {
      return {
        main: key,
        sub: product.category
      };
    }
  }

  return {
    main: "otros",
    sub: product.category
  };
}