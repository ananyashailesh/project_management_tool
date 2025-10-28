import axios from 'axios';

// Get and validate the API URL
const getBaseURL = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  
  // If no env variable, use localhost
  if (!apiUrl || apiUrl.trim() === '') {
    return 'http://localhost:8000';
  }
  
  // Clean up the URL
  const cleanUrl = apiUrl.trim();
  
  // Validate it starts with http:// or https://
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    console.error('Invalid API URL:', cleanUrl);
    return 'http://localhost:8000';
  }
  
  return cleanUrl;
};

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('API Base URL:', api.defaults.baseURL);

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tm_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
