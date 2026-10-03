import axios from "axios";

const configuredBaseUrl =
  import.meta.env.VITE_API_URL ||
  "https://wavely-backend-7ryc.onrender.com/api";
const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: /\/api$/i.test(normalizedBaseUrl)
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`,
  withCredentials: true,
});

export default api;
