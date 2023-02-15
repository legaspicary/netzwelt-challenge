// Utilities
import axios, { Axios } from "axios";
import { createPinia } from "pinia";

declare module "pinia" {
  export interface PiniaCustomProperties {
    get axiosAPI(): Axios;
  }
}

const pinia = createPinia();

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

pinia.use(() => ({ axiosAPI }));

export default pinia;
