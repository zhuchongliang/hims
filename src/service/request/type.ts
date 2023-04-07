import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios"

export interface IMyRequestConfig extends AxiosRequestConfig {
  interceptorsHook?: IInterceptorsHook
}

export interface IInterceptorsHook {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}
