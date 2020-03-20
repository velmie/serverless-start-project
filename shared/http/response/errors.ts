import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { responseObjectToJSON } from '@shared/http/helpers/responseObjectToJSON';
import { logger } from '@logger/logger';
import { ICustomError, isCustomErrorInterface } from '@errors/custom/misc/customErrorInterface';
import { ResponseSingleError } from '@errors/custom/http/responseSingleError';
import { ErrorTarget } from '@constants/errors';
import { snakeCase } from '@helpers/snakeCase';
import { LambdaInvokeError } from '@errors/custom/lambdaInvokeError';
import { IResponce } from '@shared/http/response/responceInterface';
import { HttpCode } from '@constants/httpCode';

/**
 * Internal server error
 *
 * @param {Error} error
 * @param {number} statusCode - default is 500
 * @returns {IResponce}
 */
export function internalErrorResp(error: Error, statusCode?: number): IResponce {
  logger.error('internalErrorResp', error.message, JSON.stringify(error));
  const code = statusCode ? statusCode : HttpCode.INTERNAL_SERVER_ERROR;

  const response = {
    errors: [new ResponseSingleError('internal_error', ErrorTarget.COMMON, 'Internal Server Error')]
  };

  return responseObjectToJSON(code, response);
}

/**
 * Unauthorized error
 *
 *  * default statusCode is 401
 *
 * @param {Error} error
 * @returns {}
 */
export function unauthorizedErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.UNAUTHORIZED);
}

/**
 * Validation error
 *
 * default statusCode is 422
 *
 * @param {ICustomError | Error} error
 * @returns {IResponce}
 */
export function validationErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.VALIDATION_ERROR);
}

/**
 * @param {ICustomError | Error} error
 * @returns {IResponce}
 */
export function notFoundErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.NOT_FOUND);
}

/**
 * Bad request error
 *
 * statusCode is 400
 *
 * @param {ICustomError | Error} error
 * @returns {IResponce}
 */
export function badRequestErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.BAD_REQUEST);
}

/**
 * @param {LambdaInvokeError} error
 * @returns {IResponce}
 */
export function lambdaInvokeErrorResp(error: LambdaInvokeError): IResponce {
  return error.getRequestPayload();
}

/**
 * @param {ErrorCollection} collection
 * @param {number} statusCode
 * @returns {IResponce}
 */
export function validationErrorCollectionResp(collection: ErrorCollection,
                                              statusCode?: number): IResponce {
  logger.error('Validation errors - collection', collection);
  const code: number = statusCode ? statusCode : HttpCode.VALIDATION_ERROR;

  return responseObjectToJSON(code, collection);
}

/**
 * @param {Error} error
 * @returns {IResponce}
 */
export function responseHtmlError(error: Error): IResponce {
  logger.error('Response html error', JSON.stringify(error));

  return  {
    statusCode: HttpCode.INTERNAL_SERVER_ERROR,
    headers: {
      'Content-Type': 'text/html'
    },
    body: '<h1>Something went wrong</h1>'
  };
}

/**
 * @param {ICustomError | Error} error
 * @param {number} statusCode
 * @returns {IResponce}
 */
function errorResp(error: ICustomError | Error, statusCode: number): IResponce {
  let singleError: any;
  if (isCustomErrorInterface(error)) {
    singleError = new ResponseSingleError(<ICustomError>error);
  } else {
    singleError = new ResponseSingleError(snakeCase(error.constructor.name), ErrorTarget.COMMON, error.message);
  }
  logger.error(singleError.code + ' - single error', JSON.stringify(singleError));

  const data = {
    errors: [singleError]
  };

  return responseObjectToJSON(statusCode, data);
}
