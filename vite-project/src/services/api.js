import axios from "axios";

const defaultBaseUrl = "https://wavely-backend-7ryc.onrender.com/api";

const configuredBaseUrl = import.meta.env.VITE_API_URL;

const baseUrl = import.meta.env.PROD
  ? "/api"
  : configuredBaseUrl
    ? configuredBaseUrl.replace(/\/+$/, "")
    : defaultBaseUrl;

const api = axios.create({
  baseURL: /\/api$/i.test(baseUrl) ? baseUrl : `${baseUrl}/api`,
  withCredentials: true,
});

const socketBaseUrl =
  import.meta.env.VITE_SOCKET_URL ||
  new URL(
    configuredBaseUrl?.startsWith("/")
      ? defaultBaseUrl
      : configuredBaseUrl || defaultBaseUrl,
    window.location.origin,
  ).origin;

export { socketBaseUrl };
export default api;
