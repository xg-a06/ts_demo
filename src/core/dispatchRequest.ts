import { WebRequestConfig, WebRequestPromise, WebRequestResponse } from '../types';
import xhr from './xhr';
import { analysisURL } from '../utils/url';
import { transformRequest, transformResponse } from '../utils/data';
import { processHeaders, flattenHeaders } from '../utils/headers';
import transform from './transform';

function webRequest(config: WebRequestConfig): WebRequestPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

function processConfig(config: WebRequestConfig): void {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL(config: WebRequestConfig): string {
  const { url, params } = config;
  return analysisURL(url!, params);
}

function transformResponseData(res: WebRequestResponse): WebRequestResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}

export default webRequest;
