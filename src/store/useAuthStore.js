import { create } from 'zustand';
import { loginUser } from '../services/api';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('ghazi_user')) || null,
  token: localStorage.getItem('ghazi_token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;
      localStorage.setItem('ghazi_token', token);
      localStorage.setItem('ghazi_user', JSON.stringify(user));
      set({ user, token, loading: false });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      set({ loading: false, error: msg });
      return { success: false, message: msg };
    }
  },

  logout: () => {
    localStorage.removeItem('ghazi_token');
    localStorage.removeItem('ghazi_user');
    set({ user: null, token: null });
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('ghazi_user'));
    return user?.role === 'admin';
  },
}));
