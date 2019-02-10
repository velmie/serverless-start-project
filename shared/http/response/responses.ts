import {Callback, Handler} from 'aws-lambda';
import {logger} from '@logger/logger';

export function response(cb: Callback, data?: object, headers?: object): Handler {

  const httpResponse = {
    statusCode: 200,
    body: ''
  };

  if (data) {
    httpResponse.body = JSON.stringify(data);
  }

  if (headers) {
    if (headers.hasOwnProperty('statusCode')) {
      httpResponse.statusCode = (headers as any).statusCode;
      delete (headers as any).statusCode;
    }

    (httpResponse as any).headers = headers;
  }

  return cb(null, httpResponse);
}

export function responseOk(cb: Callback, data: object): Handler {
  return response(cb, data, {statusCode: 200});
}

export function responseCreated(cb: Callback, data?: object): Handler {
  return response(cb, data, {statusCode: 201});
}

export function responseNoContent(cb: Callback): Handler {
  return response(cb, undefined, {statusCode: 204});
}

export function responseAlreadyReported(cb: Callback, e?: Error): Handler {
  if (e) {
    logger.error(e.message, e);
  }

  return response(cb, undefined, {statusCode: 208});
}

export function responseHtml(cb: Callback, html: string): Handler {
  return cb(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: html
  });
}
