import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL + "/api/",
      // timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use((config) => {
      let token = "";
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token") || ""
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
}
const http = new Http().instance;
export default http;
export const coinEndpoint = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
   
  },
});