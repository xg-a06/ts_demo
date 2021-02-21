import { WebRequestConfig, WebRequestPromise, WebRequestResponse } from '../types';
import { parseHeaders } from '../utils/headers';
import { createError } from '../utils/error';

function xhr(config: WebRequestConfig): WebRequestPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());

      const responseData = responseType === 'text' ? request.responseText : request.response;

      const reponse: WebRequestResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      handelResponse(reponse);
    };

    request.onerror = function handleError() {
      reject(createError('network error', config, null, request));
    };

    request.ontimeout = function handleTimeout() {
      reject(createError(`timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request));
    };

    Object.entries(headers).forEach(([k, v]) => {
      if (data === null && k.toLowerCase() === 'content-type') {
        delete headers[k];
      } else {
        request.setRequestHeader(k, v as string);
      }
    });

    request.send(data);

    function handelResponse(response: WebRequestResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    }
  });
}

export default xhr;
