import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
  loginWithGoogle: () => {
    window.location.href = `${API_URL.replace('/api', '')}/api/auth/google`;
  },
};

export const albumAPI = {
  createAlbum: (data) => api.post('/albums', data),
  getAlbums: () => api.get('/albums'),
  getAlbumById: (id) => api.get(`/albums/${id}`),
  updateAlbum: (id, data) => api.put(`/albums/${id}`, data),
  deleteAlbum: (id) => api.delete(`/albums/${id}`),
};

export const memoryAPI = {
  createMemory: (data) => api.post('/memories', data),
  getMemoriesByAlbum: (albumId) => api.get(`/memories/album/${albumId}`),
  updateMemory: (id, data) => api.put(`/memories/${id}`, data),
  deleteMemory: (id) => api.delete(`/memories/${id}`),
};

export default api;
