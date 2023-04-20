import { API_BASE_URL, TIME_OUT } from "./request/config";
import Request from "./request"
import cache from "../utils/cache"
import { showErrorMessage, showSuccessMessage } from "@/utils/error-handle";

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
      if (res.data.message) {
        showSuccessMessage(res.data.message);
        return res.data?.data;
      }
      return res.data;
    },
    responseInterceptorCatch(err) {
      if (err.response.data) {
        showErrorMessage(err.response.data);
      } else {
        showErrorMessage(err.message);
      }
    }
  }
});
