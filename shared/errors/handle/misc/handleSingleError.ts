import { EntityNotFoundError } from '@errors/typeorm/entityNotFoundError';
import { ValidationError } from '@errors/custom/validationError';
import { FieldError } from '@errors/custom/fieldError';
import { BadRequestError } from '@errors/custom/http/badRequestError';
import { LambdaInvokeError } from '@errors/custom/lambdaInvokeError';
import { AlreadyExists } from '@errors/custom/alreadyExists';
import { responseAlreadyReported } from '@responses';
import { badRequestErrorResp, internalErrorResp, lambdaInvokeErrorResp, notFoundErrorResp, validationErrorResp } from '@responseErrors';
import { ResponceInterface } from '@shared/http/response/responceInterface';

/**
 * @param {Error} e
 * @returns {}
 */
export function handleSingleError(e: Error): ResponceInterface {
  switch (true) {
    case e instanceof AlreadyExists:
      return responseAlreadyReported(e);
    case e instanceof EntityNotFoundError:
      return notFoundErrorResp(e);
    case e instanceof ValidationError:
    case e instanceof FieldError:
      return validationErrorResp(e);
    case e instanceof BadRequestError:
      return badRequestErrorResp(e);
    case e instanceof LambdaInvokeError:
      return lambdaInvokeErrorResp(<LambdaInvokeError>e);
    default:
      return internalErrorResp(e);
  }
}
