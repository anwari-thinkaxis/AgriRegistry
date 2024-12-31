import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Axios instance for your custom API endpoints (with /api)
const api = axios.create({
  baseURL: "https://localhost:5000/api", // Base URL for your application's API
  withCredentials: true, // Include credentials if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Fetch the token from localStorage or another source
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to check token expiration
function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token); // Specify the shape of the decoded token
    return Date.now() >= exp * 1000; // `exp` is in seconds, so multiply by 1000
  } catch {
    return true; // Invalid token
  }
}

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token"); // Clear the expired token
        window.location.href = "/auth/login?sessionExpired=true"; // Redirect to the login page
      }
    }
    return Promise.reject(error);
  }
);

// Axios instance for Identity API (without /api)
const authApi = axios.create({
  baseURL: "https://localhost:5000/api/auth", // Base URL without /api for Identity
  withCredentials: true, // Include credentials if needed
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, authApi };
