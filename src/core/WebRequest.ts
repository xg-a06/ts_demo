import {
  WebRequestPromise,
  WebRequestConfig,
  Method,
  WebRequestResponse,
  ResloveFn,
  RejectFn
} from '../types';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptors {
  request: InterceptorManager<WebRequestConfig>;
  response: InterceptorManager<WebRequestResponse>;
}

interface PromiseChain<T> {
  resolved: ResloveFn<T> | ((config: WebRequestConfig) => WebRequestPromise);
  rejected?: RejectFn;
}

class WebRequest {
  defaults: WebRequestConfig;
  interceptors: Interceptors;

  constructor(initConfig: WebRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<WebRequestConfig>(),
      response: new InterceptorManager<WebRequestResponse>()
    };
  }
  request(url: string, config?: WebRequestConfig): WebRequestPromise;
  request(config: WebRequestConfig): WebRequestPromise;
  request(url: any, config: any = {}): WebRequestPromise {
    if (typeof url === 'string') {
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ];

    this.interceptors.request.forEach(interceptors => {
      chain.unshift(interceptors);
    });

    this.interceptors.response.forEach(interceptors => {
      chain.push(interceptors);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }
    return promise;
  }
  _requestMethodWithoutData(method: Method, url: string, config?: WebRequestConfig) {
    let conf = Object.assign({}, config, { method, url });
    return this.request(conf);
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: WebRequestConfig) {
    let conf = Object.assign({}, config, { method, url, data });
    return this.request(conf);
  }
  get(url: string, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithoutData('get', url, config);
  }
  delete(url: string, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithoutData('delete', url, config);
  }
  head(url: string, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithoutData('head', url, config);
  }
  options(url: string, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithoutData('options', url, config);
  }
  post(url: string, data?: any, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithData('post', url, data, config);
  }
  put(url: string, data?: any, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithData('put', url, data, config);
  }
  patch(url: string, data?: any, config?: WebRequestConfig): WebRequestPromise {
    return this._requestMethodWithData('patch', url, data, config);
  }
}

export default WebRequest;
