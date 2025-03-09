import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  // items stored as an object: { [productId]: quantity }
  items: {},
  addItem: (itemId) => {
    // Ensure itemId is a string
    const id = String(itemId);
    set((state) => {
      const newItems = { ...state.items };
      if (newItems[id]) {
        newItems[id] += 1;
      } else {
        newItems[id] = 1;
      }
      return { items: newItems };
    });
  },
  cartCount: () => {
    const items = get().items;
    return Object.values(items).reduce((sum, qty) => sum + qty, 0);
  },
}));
