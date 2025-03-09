import { useContext } from "react";
import { ShopContext } from "../app/context/shopContext";

// Optional: Translate product keys if you need to override
const translateProduct = (product) => ({
  ...product,
  name: product.nameKey || product.name,
  description: product.descriptionKey || product.description,
});

export const useProducts = () => {
  const { products } = useContext(ShopContext);

  const getProductsByCategory = (category, subcategory) => {
    const filtered = products.filter((product) =>
      subcategory
        ? product.category === category && product.subcategory === subcategory
        : product.category === category
    );
    return filtered.map(translateProduct);
  };

  const getUniqueSubcategories = (category) => {
    const subcats = products
      .filter((product) => product.category === category)
      .map((product) => product.subcategory);
    return Array.from(new Set(subcats));
  };

  const getBestsellerProducts = () => {
    const filtered = products.filter((product) => product.bestseller);
    return filtered.map(translateProduct);
  };

  // If needed, add additional helper functions (e.g. searchProducts)
  return {
    getProductsByCategory,
    getUniqueSubcategories,
    getBestsellerProducts, // Add this line
  };
};
