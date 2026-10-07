import axios from "axios";

const defaultBaseUrl = "https://wavely-backend-7ryc.onrender.com/api";
const configuredBaseUrl = import.meta.env.VITE_API_URL || defaultBaseUrl;
const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");
const resolvedBaseUrl =
  import.meta.env.PROD && !/^https?:\/\//i.test(normalizedBaseUrl)
    ? defaultBaseUrl
    : normalizedBaseUrl;

const api = axios.create({
  baseURL: /\/api$/i.test(resolvedBaseUrl)
    ? resolvedBaseUrl
    : `${resolvedBaseUrl}/api`,
  withCredentials: true,
});

export default api;
