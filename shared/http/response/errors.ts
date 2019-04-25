import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { responseObjectToJSON } from '@shared/http/helpers/responseObjectToJSON';
import { logger } from '@logger/logger';
import { ICustomError, isCustomErrorInterface } from '@errors/custom/misc/customErrorInterface';
import { ResponseSingleError } from '@errors/custom/http/responseSingleError';
import { ErrorTarget } from '@constants/errors';
import { snakeCase } from '@helpers/snakeCase';
import { LambdaInvokeError } from '@errors/custom/lambdaInvokeError';
import { IResponce } from '@shared/http/response/responceInterface';
/*tslint:disable: no-magic-numbers*/

/**
 * Internal server error
 *
 * @param error
 * @param {number} statusCode - default is 500
 */
export function internalErrorResp(error: Error, statusCode?: number): IResponce {
  logger.error('internalErrorResp', error.message, JSON.stringify(error));
  const code = statusCode ? statusCode : 500;

  const response = {
    errors: [new ResponseSingleError('internal_error', ErrorTarget.COMMON, 'Internal Server Error')]
  };

  return responseObjectToJSON(code, response);
}

/**
 * Unauthorized error
 *
 * @param {Error} error
 * @returns {}
 */
export function unauthorizedResp(error: Error): string {
  logger.debug('responseErrors - unauthorizedResp');
  logger.error(error.message, error);

  return 'Unauthorized';
}

/**
 * Validation error
 *
 * default statusCode is 422
 *
 * @param {Error} error
 * @returns {}
 */
export function validationErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, 422);
}

/**
 * @param {CustomErrorInterface} error
 * @returns {}
 */
export function notFoundErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, 404);
}

/**
 * Bad request error
 *
 * statusCode is 400
 *
 * @param {Error} error
 * @returns {}
 */
export function badRequestErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, 400);
}

/**
 * @param {LambdaInvokeError} error
 * @returns {}
 */
export function lambdaInvokeErrorResp(error: LambdaInvokeError): IResponce {
  return error.getRequestPayload();
}

/**
 * @param {ErrorCollection} collection
 * @param {number} statusCode
 * @returns {}
 */
export function validationErrorCollectionResp(collection: ErrorCollection,
                                              statusCode?: number): IResponce {
  logger.error('Validation errors - collection', collection);
  const code: number = statusCode ? statusCode : 422;

  return responseObjectToJSON(code, collection);
}

/**
 * @param {Error} error
 * @returns {}
 */
export function responseHtmlError(error: Error): IResponce {
  logger.error('Response html error', JSON.stringify(error));

  return  {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/html'
    },
    body: '<h1>Something went wrong</h1>'
  };
}

/**
 * @param {CustomErrorInterface | Error} error
 * @param {number} statusCode
 * @returns {}
 */
function errorResp(error: ICustomError | Error, statusCode: number): IResponce {
  let singleError: any;
  if (isCustomErrorInterface(error)) {
    singleError = new ResponseSingleError(<ICustomError>error);
  } else {
    singleError = new ResponseSingleError(snakeCase(error.constructor.name), ErrorTarget.COMMON, error.message);
  }
  logger.error(singleError.code + ' - single error', JSON.stringify(error));

  const data = {
    errors: [singleError]
  };

  return responseObjectToJSON(statusCode, data);
}
