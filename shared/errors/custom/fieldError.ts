import { ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * @class FieldError
 */
export class FieldError
  extends Error
  implements ICustomError {
  public readonly code: string;
  public readonly target: string;

  public readonly source: object;

  /**
   * @param {string} message
   * @param {string} code
   * @param {object} source
   */
  constructor(message: string, code: string, source: object) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, FieldError.prototype);

    this.message = message;
    this.code = code;
    this.source = source;
    this.target = ErrorTarget.FIELD;
  }
}
