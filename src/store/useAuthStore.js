import { create } from 'zustand';
import { loginUser } from '../services/api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('ghazi_admin_user') || 'null'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await loginUser({ email, password });

      if (data.user?.role !== 'admin') {
        set({ loading: false, error: 'Admin access only' });
        return { success: false };
      }

      localStorage.setItem('ghazi_token', data.token);
      localStorage.setItem('ghazi_admin_user', JSON.stringify(data.user));
      set({ user: data.user, loading: false });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password';
      set({ loading: false, error: message });
      return { success: false };
    }
  },

  logout: () => {
    localStorage.removeItem('ghazi_token');
    localStorage.removeItem('ghazi_admin_user');
    set({ user: null });
  },
}));
