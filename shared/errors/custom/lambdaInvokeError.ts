import {LambdaRequestPayloadInterface} from '@services/aws/misc/lambdaRequestPayloadInterface';

/**
 * @class ValidationError
 */
export class LambdaInvokeError extends Error {

  private requestPayload: LambdaRequestPayloadInterface;

  /**
   * @param {LambdaRequestPayloadInterface} requestPayload
   */
  public constructor(requestPayload: LambdaRequestPayloadInterface) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, LambdaInvokeError.prototype);

    this.requestPayload = requestPayload;
  }

  /**
   * @returns {number}
   */
  public getRequestPayload(): LambdaRequestPayloadInterface {
    return this.requestPayload;
  }
}
