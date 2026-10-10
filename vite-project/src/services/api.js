import axios from "axios";

const defaultBaseUrl = "https://wavely-backend-7ryc.onrender.com/api";

const configuredBaseUrl = import.meta.env.VITE_API_URL;

const baseUrl = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/+$/, "")
  : import.meta.env.PROD
    ? "/api"
    : defaultBaseUrl;

const api = axios.create({
  baseURL: /\/api$/i.test(baseUrl) ? baseUrl : `${baseUrl}/api`,
  withCredentials: true,
});

export default api;
