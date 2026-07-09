// API Configuration
// In development: uses localhost:8080
// In production: uses environment variable VITE_API_URL (for Vite)

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default API_URL;
