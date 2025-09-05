import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const booksAPI = {
  getBooks: (params = {}) => {
    return api.get('/books', { params });
  },

  getBook: (id) => {
    return api.get(`/books/${id}`);
  },

  refreshBooks: () => {
    return api.post('/refresh');
  },

  getStats: () => {
    return api.get('/stats');
  },
};

export default api;
