import {Callback, Handler} from 'aws-lambda';
import {ErrorCollection} from '@errors/custom/misc/errorCollection';
import {responseObjectToJSON} from '@shared/http/helpers/responseObjectToJSON';
import {logger} from '@logger/logger';
import {CustomErrorInterface, isCustomErrorInterface} from '@errors/custom/misc/customErrorInterface';
import {ResponseSingleError} from '@errors/custom/http/responseSingleError';
import {ErrorTarget} from '@constants/errors';
import {snakeCase} from '@helpers/snakeCase';
import {LambdaInvokeError} from '@errors/custom/lambdaInvokeError';

/**
 * Internal server error
 *
 * @param cb
 * @param error
 * @param {number} statusCode - default is 500
 */
export function internalErrorResp(cb: Callback, error: Error, statusCode?: number): Handler {
  logger.error('internalErrorResp', error.message, JSON.stringify(error));
  const code = statusCode ? statusCode : 500;

  const response = {
    errors: [new ResponseSingleError('internal_error', ErrorTarget.COMMON, 'Internal Server Error')]
  };

  return cb(null, responseObjectToJSON(code, response));
}

/**
 * Unauthorized error
 *
 * @param {} cb
 * @param {Error} error
 * @returns {}
 */
export function unauthorizedResp(cb: Callback, error: Error): Handler {
  logger.debug('responseErrors - unauthorizedResp');
  logger.error(error.message, error);

  return cb('Unauthorized');
}

/**
 * Validation error
 *
 * default statusCode is 422
 *
 * @param {} cb
 * @param {Error} error
 * @returns {}
 */
export function validationErrorResp(cb: Callback, error: CustomErrorInterface | Error): Handler {
  return errorResp(cb, error, 422);
}

/**
 * @param {} cb
 * @param {CustomErrorInterface} error
 * @returns {}
 */
export function notFoundErrorResp(cb: Callback, error: CustomErrorInterface | Error): Handler {
  return errorResp(cb, error, 404);
}

/**
 * Bad request error
 *
 * statusCode is 400
 *
 * @param {} cb
 * @param {Error} error
 * @returns {}
 */
export function badRequestErrorResp(cb: Callback, error: CustomErrorInterface | Error): Handler {
  return errorResp(cb, error, 400);
}

/**
 * @param {} cb
 * @param {LambdaInvokeError} error
 * @returns {}
 */
export function lambdaInvokeErrorResp(cb: Callback, error: LambdaInvokeError): Handler {
  return cb(null, error.getRequestPayload());
}

/**
 * @param {} cb
 * @param {ErrorCollection} collection
 * @param {number} statusCode
 * @returns {}
 */
export function validationErrorCollectionResp(cb: Callback,
                                              collection: ErrorCollection,
                                              statusCode?: number): Handler {
  logger.error('Validation errors - collection', collection);
  const code: number = statusCode ? statusCode : 422;

  return cb(null, responseObjectToJSON(code, collection));
}

/**
 * @param {} cb
 * @param {Error} error
 * @returns {}
 */
export function responseHtmlError(cb: Callback, error: Error): Handler {
  logger.error('Response html error', JSON.stringify(error));

  cb(null, {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/html'
    },
    body: '<h1>Something went wrong</h1>'
  });
}

/**
 * @param {} cb
 * @param {CustomErrorInterface | Error} error
 * @param {number} statusCode
 * @returns {}
 */
function errorResp(cb: Callback, error: CustomErrorInterface | Error, statusCode: number): Handler {
  let singleError: any;
  if (isCustomErrorInterface(error)) {
    singleError = new ResponseSingleError(<CustomErrorInterface>error);
  } else {
    singleError = new ResponseSingleError(snakeCase(error.constructor.name), ErrorTarget.COMMON, error.message);
  }
  logger.error(singleError.code + ' - single error', JSON.stringify(error));

  const data = {
    errors: [singleError]
  };

  return cb(null, responseObjectToJSON(statusCode, data));
}
