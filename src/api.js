import axios from 'axios';

const api = axios.create({
  // Use the environment variable, and append '/api' since your backend uses that prefix
  baseURL: import.meta.env.VITE_API_URL + '/api',
});

// Attach JWT token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Note: Ensure your backend middleware looks for 'x-auth-token' 
      // or 'Authorization' (Bearer) depending on your setup.
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;