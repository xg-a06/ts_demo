import { WebRequestConfig, WebRequestPromise, WebRequestResponse } from '../types';
import xhr from './xhr';
import { analysisURL } from '../utils/url';
import { transformRequest, transformResponse } from '../utils/data';
import { processHeaders } from '../utils/headers';

function webRequest(config: WebRequestConfig): WebRequestPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

function processConfig(config: WebRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeasers(config);
  config.data = transformRequestData(config);
}

function transformURL(config: WebRequestConfig): string {
  const { url, params } = config;
  return analysisURL(url!, params);
}

function transformRequestData(config: WebRequestConfig): any {
  const { data } = config;
  return transformRequest(data);
}

function transformHeasers(config: WebRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: WebRequestResponse): WebRequestResponse {
  res.data = transformResponse(res.data);
  return res;
}

export default webRequest;
