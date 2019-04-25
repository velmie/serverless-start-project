import { ILambdaRequestPayloadInterface } from '@services/aws/misc/lambdaRequestPayloadInterface';

/**
 * @class ValidationError
 */
export class LambdaInvokeError extends Error {
  private requestPayload: ILambdaRequestPayloadInterface;

  /**
   * @param {ILambdaRequestPayloadInterface} requestPayload
   */
  public constructor(requestPayload: ILambdaRequestPayloadInterface) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, LambdaInvokeError.prototype);

    this.requestPayload = requestPayload;
  }

  /**
   * @returns {number}
   */
  public getRequestPayload(): ILambdaRequestPayloadInterface {
    return this.requestPayload;
  }
}
