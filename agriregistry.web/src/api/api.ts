import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7069/api', // Replace with your API's base URL
});

export default api;
