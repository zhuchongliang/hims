import type { AxiosRequestConfig, AxiosInstance } from "axios"
import type { IMyRequestConfig, IInterceptorsHook } from "./type"
import axios from "axios"

class Request {
  config: AxiosRequestConfig
  instance: AxiosInstance
  interceptorsHook?: IInterceptorsHook

  constructor(config: IMyRequestConfig) {
    this.config = config;
    this.interceptorsHook = config.interceptorsHook
    this.instance = axios.create(config);

    this.setupInterceptors(this.interceptorsHook);
  }

  setupInterceptors (interceptorsHook?: IInterceptorsHook) {
    this.instance.interceptors.request.use(
      interceptorsHook?.requestInterceptor,
      interceptorsHook?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      interceptorsHook?.responseInterceptor,
      interceptorsHook?.responseInterceptorCatch
    )
  }

  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<any, T>(config).then((res) => {
      return res;
    }, (err) => {
      console.log(err);
    })
  }
}
export default Request;
