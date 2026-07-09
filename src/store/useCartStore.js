import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add standard item or custom request
      addToCart: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.id === item.id && i.isCustom === item.isCustom
          );

          if (existingItemIndex > -1 && !item.isCustom) {
            // Update quantity for standard items
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems };
          }
          
          // Add new item (or custom request, which always adds as new line item)
          return { items: [...state.items, { ...item, cartItemId: Date.now().toString() }] };
        });
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId)
        }));
      },

      updateQuantity: (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        set((state) => ({
          items: state.items.map((i) => 
            i.cartItemId === cartItemId ? { ...i, quantity: newQuantity } : i
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      // Derived state
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      getSubtotal: () => get().items.reduce((total, item) => {
        if (item.isCustom) return total; // Custom items don't add to immediate subtotal
        return total + (item.price * item.quantity);
      }, 0),
    }),
    {
      name: 'ghazi-cart-storage',
    }
  )
);
