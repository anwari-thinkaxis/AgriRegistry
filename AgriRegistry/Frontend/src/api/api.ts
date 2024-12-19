import axios from 'axios';

// Axios instance for your custom API endpoints (with /api)
const api = axios.create({
    baseURL: 'https://localhost:5000/api', // Base URL for your application's API
    withCredentials: true, // Include credentials if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios instance for Identity API (without /api)
const authApi = axios.create({
    baseURL: 'https://localhost:5000', // Base URL without /api for Identity
    withCredentials: true, // Include credentials if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export { api, authApi };
