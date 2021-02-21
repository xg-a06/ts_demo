import { WebRequestConfig, WebRequestResponse } from '../types';

class WebRequestError extends Error {
  isWebRequestError: boolean;
  config: WebRequestConfig;
  code?: string | null;
  request?: any;
  response?: WebRequestResponse;

  constructor(
    message: string,
    config: WebRequestConfig,
    code?: string | null,
    request?: any,
    response?: WebRequestResponse
  ) {
    super(message);
    this.isWebRequestError = true;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;

    Object.setPrototypeOf(this, WebRequestError.prototype);
  }
}

function createError(
  message: string,
  config: WebRequestConfig,
  code?: string | null,
  request?: any,
  response?: WebRequestResponse
) {
  const error = new WebRequestError(message, config, code, request, response);
  return error;
}

export { createError };
