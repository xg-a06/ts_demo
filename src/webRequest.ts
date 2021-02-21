import { WebRequestInstance } from './types';
import WebRequest from './core/WebRequest';
import { extend } from './utils/tools';

function createInstance(): WebRequestInstance {
  const context = new WebRequest();
  const instance = WebRequest.prototype.request.bind(context);

  extend(instance, context);

  return instance as WebRequestInstance;
}

const webRequest = createInstance();

export default webRequest;
