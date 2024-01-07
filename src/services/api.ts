import axios, { AxiosHeaderValue } from "axios";

// Types
type AxiosHeaderKey =
  | "Accept"
  | "Content-Length"
  | "User-Agent"
  | "Content-Encoding"
  | "Authorization"
  | "Content-Type";

// API
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
});

export const setHeader = (key: AxiosHeaderKey, value: AxiosHeaderValue) => {
  api.defaults.headers.common[key] = value;
};

export const removeHeader = (key: AxiosHeaderKey) => {
  delete api.defaults.headers.common[key];
};

export default api;
