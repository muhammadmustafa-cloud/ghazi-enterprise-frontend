import axios from 'axios';

import { API_BASE_URL } from '../config/env';



const api = axios.create({

  baseURL: API_BASE_URL,

});



api.interceptors.request.use((config) => {

  const token = localStorage.getItem('ghazi_token');

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }

  return config;

});



api.interceptors.response.use(

  (res) => res,

  (err) => {

    if (err.response?.status === 401) {

      localStorage.removeItem('ghazi_token');

      localStorage.removeItem('ghazi_admin_user');

      if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {

        window.location.href = '/admin/login';

      }

    }

    return Promise.reject(err);

  }

);



// Auth

export const loginUser = (credentials) => api.post('/auth/login', credentials);



// Products

export const fetchProducts = () => api.get('/products');

export const fetchProductById = (id) => api.get(`/products/${id}`);

export const createProduct = (data) => api.post('/products', data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);



// Categories

export const fetchCategories = () => api.get('/categories');

export const createCategory = (data) => api.post('/categories', data);

export const deleteCategory = (id) => api.delete(`/categories/${id}`);



// Orders

export const fetchOrders = () => api.get('/orders');

export const createOrder = (data) => api.post('/orders', data);

export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });

export const deleteOrder = (id) => api.delete(`/orders/${id}`);



export default api;

