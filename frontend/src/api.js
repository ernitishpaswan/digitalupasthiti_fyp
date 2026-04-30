// API calls ka centralized file
// Yahan se saari backend calls hongi
import axios from 'axios';

// Base URL - environment variable ya default
const API_URL = process.env.REACT_APP_API_URL || '/api';


const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Har request mein automatically JWT token add karo
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 aaye toh logout kar do
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ─── Public APIs (website ke liye) ───

// Latest APK info lo
export const getLatestRelease = () => api.get('/releases/latest');

// Site content lo (hero text, social links etc.)
export const getSiteContent = () => api.get('/content');

// ─── Admin APIs (admin panel ke liye) ───

// Auth
export const adminLogin = (data) => api.post('/auth/login', data);
export const verifyToken = () => api.get('/auth/me');
export const changePassword = (data) => api.post('/auth/change-password', data);

// Releases
export const getAllReleases = () => api.get('/releases');
export const createRelease = (formData) =>
  api.post('/releases', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const updateRelease = (id, data) => api.put(`/releases/${id}`, data);
export const deleteRelease = (id) => api.delete(`/releases/${id}`);

// Content
export const updateContent = (key, data) => api.put(`/content/${key}`, data);
export const bulkUpdateContent = (items) => api.post('/content/bulk', { items });

export default api;
