// src/data/products.js

// A product object can have the following properties:
// id, nameKey, descriptionKey, price, image, category, subcategory, region, origin, name, description

const productsData = [
  // Gemüse
  {
    id: 1,
    nameKey: "vegetable",
    descriptionKey: "frest vegetables",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800",
    category: "gemüse",
    subcategory: "frischgemüse",
    origin: "Niederösterreich",
  },
  {
    id: 2,
    nameKey: "products.vegetables.carrots.name",
    descriptionKey: "products.vegetables.carrots.description",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80&w=800",
    category: "gemüse",
    subcategory: "wurzelgemüse",
    origin: "Marchfeld",
  },
  {
    id: 3,
    nameKey: "products.vegetables.peppers.name",
    descriptionKey: "products.vegetables.peppers.description",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=800",
    category: "gemüse",
    subcategory: "frischgemüse",
    origin: "Burgenland",
  },
  {
    id: 4,
    nameKey: "products.vegetables.cucumbers.name",
    descriptionKey: "products.vegetables.cucumbers.description",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1449300079323-02847456d222?auto=format&fit=crop&q=80&w=800",
    category: "gemüse",
    subcategory: "frischgemüse",
    origin: "Niederösterreich",
  },
  {
    id: 5,
    nameKey: "products.vegetables.potatoes.name",
    descriptionKey: "products.vegetables.potatoes.description",
    price: 3.49,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800",
    category: "gemüse",
    subcategory: "wurzelgemüse",
    origin: "Waldviertel",
  },
  {
    id: 6,
    nameKey: "products.vegetables.onions.name",
    descriptionKey: "products.vegetables.onions.description",
    price: 2.99,
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=800",
    category: "gemüse",
    subcategory: "wurzelgemüse",
    origin: "Marchfeld",
  },

  // Weine
  {
    id: 7,
    nameKey: "products.wines.gruner_veltliner.name",
    descriptionKey: "products.wines.gruner_veltliner.description",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1474722883634-c8813f0f6d66?auto=format&fit=crop&q=80&w=800",
    category: "weine",
    subcategory: "weißwein",
    region: "Wachau",
  },
  {
    id: 8,
    nameKey: "products.wines.blaufraenkisch.name",
    descriptionKey: "products.wines.blaufraenkisch.description",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    category: "weine",
    subcategory: "rotwein",
    region: "Mittelburgenland",
  },
  {
    id: 9,
    nameKey: "products.wines.wiener_gemischter_satz.name",
    descriptionKey: "products.wines.wiener_gemischter_satz.description",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800",
    category: "weine",
    subcategory: "weißwein",
    region: "Wien",
  },
  {
    id: 10,
    nameKey: "products.wines.zweigelt.name",
    descriptionKey: "products.wines.zweigelt.description",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&q=80&w=800",
    category: "weine",
    subcategory: "rotwein",
    region: "Carnuntum",
  },
  {
    id: 11,
    nameKey: "products.wines.riesling.name",
    descriptionKey: "products.wines.riesling.description",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&q=80&w=800",
    category: "weine",
    subcategory: "weißwein",
    region: "Wachau",
  },
  {
    id: 12,
    nameKey: "products.wines.sankt_laurent.name",
    descriptionKey: "products.wines.sankt_laurent.description",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    category: "weine",
    subcategory: "rotwein",
    region: "Thermenregion",
  },
  // Obst products (fruits) – now added!
  {
    id: 13,
    name: "Äpfel",
    description: "Knackige und süße Äpfel aus heimischem Anbau.",
    category: "obst",
    subcategory: "kernobst",
    image:
      "https://images.unsplash.com/photo-1647088212509-7d31778ad67f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 3.0,
    origin: "Österreich",
  },
  {
    id: 14,
    name: "Birnen",
    description: "Saftige und aromatische Birnen aus regionalem Anbau.",
    category: "obst",
    subcategory: "kernobst",
    image:
      "https://unsplash.com/photos/a-pile-of-fruit-sitting-on-top-of-a-wooden-table-KPAt_LFt6pw",
    price: 3.5,
    origin: "Österreich",
  },
  {
    id: 15,
    name: "Steinobst-Mix",
    description: "Eine Mischung aus Pfirsichen, Nektarinen und Aprikosen.",
    category: "obst",
    subcategory: "steinobst",
    image: "https://unsplash.com/photos/a-bowl-of-fruit-ZVqoUCqpzJ0",
    price: 4.2,
    origin: "Österreich",
  },
  {
    id: 16,
    name: "Beeren-Mix",
    description: "Frische Beeren wie Erdbeeren, Heidelbeeren und Himbeeren.",
    category: "obst",
    subcategory: "beeren",
    image:
      "https://unsplash.com/photos/a-large-display-of-fruits-and-vegetables-for-sale-3HzJmmSsZBw",
    price: 4.5,
    origin: "Österreich",
  },
  {
    id: 17,
    name: "Tropische Früchte",
    description: "Exotische Früchte wie Mango, Ananas und Papaya.",
    category: "obst",
    subcategory: "tropischefrüchte",
    image:
      "https://unsplash.com/photos/red-and-yellow-round-fruits-R9cdrnE8UoE",
    price: 5.0,
    origin: "Spanien",
  },
];

export const useProducts = () => {
  // This helper function "translates" product data.
  // If you add i18n later, you can replace the value with the actual translation.
  const translateProduct = (product) => ({
    ...product,
    name: product.nameKey,
    description: product.descriptionKey,
  });

  const getProductsByCategory = (category, subcategory) => {
    return productsData
      .filter((product) =>
        subcategory
          ? product.category === category && product.subcategory === subcategory
          : product.category === category
      )
      .map(translateProduct);
  };

  const getProductsByRegion = (region) => {
    return productsData
      .filter((product) => product.region === region)
      .map(translateProduct);
  };

  const searchProducts = (query) => {
    const searchTerm = query.toLowerCase();
    return productsData
      .map(translateProduct)
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          (product.region &&
            product.region.toLowerCase().includes(searchTerm)) ||
          (product.origin && product.origin.toLowerCase().includes(searchTerm))
      );
  };

  const getUniqueRegions = () => {
    return Array.from(
      new Set(productsData.filter((p) => p.region).map((p) => p.region))
    );
  };

  const getUniqueSubcategories = (category) => {
    return Array.from(
      new Set(
        productsData
          .filter((p) => p.category === category)
          .map((p) => p.subcategory)
      )
    );
  };

  return {
    getProductsByCategory,
    getProductsByRegion,
    searchProducts,
    getUniqueRegions,
    getUniqueSubcategories,
  };
};
