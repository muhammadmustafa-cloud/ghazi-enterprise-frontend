import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ghazi_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const fetchProducts = () => api.get('/products');
export const createProduct = (productData) => api.post('/products', productData);

// Categories
export const fetchCategories = () => api.get('/categories');
export const createCategory = (categoryData) => api.post('/categories', categoryData);

// Auth
export const loginUser = (credentials) => api.post('/auth/login', credentials);

export default api;
