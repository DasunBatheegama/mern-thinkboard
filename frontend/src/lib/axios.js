import axios from 'axios';

// in production, there's no localhost so we have to make this dynamic
const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5001/api" : "/api",
});

export default api;