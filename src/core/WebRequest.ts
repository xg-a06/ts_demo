import { WebRequestPromise, WebRequestConfig, Method } from '../types';
import dispatchRequest from './dispatchRequest';

class WebRequest {
  request(url: string, config?: WebRequestConfig): WebRequestPromise;
  request(config: WebRequestConfig): WebRequestPromise;
  request(url: any, config: any = {}): WebRequestPromise {
    if (typeof url === 'string') {
      config.url = url;
    } else {
      config = url;
    }
    return dispatchRequest(config);
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
