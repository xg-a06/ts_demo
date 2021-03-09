import { WebRequestConfig } from './types';
import { transformRequest, transformResponse } from './utils/data';
import { processHeaders } from './utils/headers';

const defaults: WebRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,text/plain,*/*'
    }
  },
  transformRequest: [
    (data: any, headers: any): any => {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    (data: any): any => {
      return transformResponse(data);
    }
  ]
};

const methodsNoData = ['delete', 'get', 'head', 'options'];

methodsNoData.forEach(method => {
  defaults.headers[method] = {};
});

const methodsWidthData = ['post', 'put', 'post'];

methodsWidthData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
});

export default defaults;
