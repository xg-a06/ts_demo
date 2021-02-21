type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

interface WebRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

interface WebRequestResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: WebRequestConfig;
  request: any;
}

interface WebRequestPromise<T = any> extends Promise<WebRequestResponse<T>> {}

interface WebRequestError extends Error {
  isWebRequestError: boolean;
  config: WebRequestConfig;
  code?: string | null;
  request?: any;
  response?: WebRequestResponse;
}
interface WebRequest {
  request<T = any>(config: WebRequestConfig): WebRequestPromise<T>;
  get<T = any>(url: string, config?: WebRequestConfig): WebRequestPromise<T>;
  delete<T = any>(url: string, config?: WebRequestConfig): WebRequestPromise<T>;
  head<T = any>(url: string, config?: WebRequestConfig): WebRequestPromise<T>;
  options<T = any>(url: string, config?: WebRequestConfig): WebRequestPromise<T>;
  post<T = any>(url: string, data?: any, config?: WebRequestConfig): WebRequestPromise<T>;
  put<T = any>(url: string, data?: any, config?: WebRequestConfig): WebRequestPromise<T>;
  patch<T = any>(url: string, data?: any, config?: WebRequestConfig): WebRequestPromise<T>;
}

interface WebRequestInstance extends WebRequest {
  <T = any>(config: WebRequestConfig): WebRequestPromise<T>;
  <T = any>(url: string, config?: WebRequestConfig): WebRequestPromise<T>;
}

export {
  Method,
  WebRequestConfig,
  WebRequestResponse,
  WebRequestPromise,
  WebRequestError,
  WebRequestInstance
};
