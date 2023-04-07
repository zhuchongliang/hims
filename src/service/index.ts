import { API_BASE_URL, TIME_OUT } from "./request/config";
import Request from "./request"
import cache from "../utils/cache"

export default new Request({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorsHook: {
    requestInterceptor(config) {
      if (cache.get("token")) {
        config.headers.Authorization = `Bearer ${cache.get("token")}`
      }
      return config;
    },
    responseInterceptor(res) {
      return res.data;
    }
  }
});
