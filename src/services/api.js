import axios from 'axios';

const API_BASE_URL = 'https://be-login-r9ax.onrender.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send CSRF cookie automatically
});



 

// Attach access token from localStorage if available
api.interceptors.request.use((config) => {
    
    const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized request');
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  getCsrf: () => axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true }),
  login: (credentials) => api.post('/api/login', credentials),
  register: (userData) => api.post('/api/register', userData),
  logout: () => api.post('/api/logout'),
  getUser: () => api.get('/api/user'),
};

export const usersAPI = {
  getUsers: () => api.get('/api/user'),
};

export default api;
