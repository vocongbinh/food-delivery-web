import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";
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
        token = localStorage.getItem("token") || "";
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
}
export const http = new Http().instance;

export const coinEndpoint = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const recommendEndpoint = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RECOMMENDATION_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class Endpoint {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_HOST + "/api/",
      // timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use((config) => {
      let token = getCookie("token");
      // if (typeof window !== "undefined") {
      //   token = localStorage.getItem("token") || ""
      // }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
}
const endpoint = new Endpoint().instance;
export default endpoint;
