import { WebRequestConfig, WebRequestStatic } from './types';
import WebRequest from './core/WebRequest';
import { extend } from './utils/tools';
import defaults from './defaults';
import mergeConfig from './core/mergeConfig';

function createInstance(config: WebRequestConfig): WebRequestStatic {
  const context = new WebRequest(config);
  const instance = WebRequest.prototype.request.bind(context);

  extend(instance, context);

  return instance as WebRequestStatic;
}

const webRequest = createInstance(defaults);

webRequest.create = config => {
  return createInstance(mergeConfig(defaults, config));
};

export default webRequest;
