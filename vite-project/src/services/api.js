import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : import.meta.env.PROD
    ? "/api"
    : "https://wavely-backend-7ryc.onrender.com/api";
const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: /\/api$/i.test(normalizedBaseUrl)
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`,
  withCredentials: true,
});

export default api;
