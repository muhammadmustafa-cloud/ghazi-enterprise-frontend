import { create } from 'zustand';
import { fetchProducts } from '../services/api';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchProducts();
      set({ products: res.data, loading: false });
    } catch {
      set({ loading: false, error: 'Failed to load products. Is the backend running?' });
    }
  },

  // Optimistically add product to store after admin creates it
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
}));
