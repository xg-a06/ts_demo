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

interface WebRequestTransformer {
  (data: any, headers: any): any;
}

interface WebRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  transformRequest?: WebRequestTransformer | WebRequestTransformer[];
  transformResponse?: WebRequestTransformer | WebRequestTransformer[];

  [propName: string]: any;
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
  defaults: WebRequestConfig;
  interceptors: {
    request: WebRequestInterceptorManager<WebRequestConfig>;
    response: WebRequestInterceptorManager<WebRequestResponse>;
  };
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

interface ResloveFn<T> {
  (val: T): T | Promise<T>;
}

interface RejectFn {
  (error: any): any;
}
interface WebRequestInterceptorManager<T> {
  use(resolve: ResloveFn<T>, rejected?: RejectFn): number;
  eject(id: number): void;
}

interface WebRequestStatic extends WebRequestInstance {
  create(config?: WebRequestConfig): WebRequestInstance;
}

export {
  Method,
  WebRequestConfig,
  WebRequestResponse,
  WebRequestPromise,
  WebRequestError,
  WebRequestInstance,
  WebRequestInterceptorManager,
  ResloveFn,
  RejectFn,
  WebRequestTransformer,
  WebRequestStatic
};
