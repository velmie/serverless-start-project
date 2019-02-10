import {Callback} from 'aws-lambda';
import {EntityNotFoundError} from '@errors/typeorm/entityNotFoundError';
import {ValidationError} from '@errors/custom/validationError';
import {FieldError} from '@errors/custom/fieldError';
import {BadRequestError} from '@errors/custom/http/badRequestError';
import {LambdaInvokeError} from '@errors/custom/lambdaInvokeError';
import {AlreadyExists} from '@errors/custom/alreadyExists';
import {responseAlreadyReported} from '@responses';
import {
  badRequestErrorResp,
  internalErrorResp,
  validationErrorResp,
  notFoundErrorResp,
  lambdaInvokeErrorResp
} from '@responseErrors';

/**
 * @param {} cb
 * @param {Error} e
 * @returns {}
 */
export function handleSingleError(cb: Callback, e: Error) {
  switch (true) {
    case e instanceof AlreadyExists:
      return responseAlreadyReported(cb, e);
    case e instanceof EntityNotFoundError:
      return notFoundErrorResp(cb, e);
    case e instanceof ValidationError:
    case e instanceof FieldError:
      return validationErrorResp(cb, e);
    case e instanceof BadRequestError:
      return badRequestErrorResp(cb, e);
    case e instanceof LambdaInvokeError:
      return lambdaInvokeErrorResp(cb, <LambdaInvokeError>e);
    default:
      return internalErrorResp(cb, e);
  }
}
