import axios from 'axios';

// Axios instance for your custom API endpoints (with /api)
const api = axios.create({
    baseURL: 'https://localhost:5000/api', // Base URL for your application's API
    withCredentials: true, // Include credentials if needed
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Fetch the token from localStorage or another source
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Axios instance for Identity API (without /api)
const authApi = axios.create({
    baseURL: 'https://localhost:5000/api/auth', // Base URL without /api for Identity
    withCredentials: true, // Include credentials if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export { api, authApi };
