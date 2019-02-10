/**
 * @class AlreadyExists
 */
export class AlreadyExists extends Error {
  public message: string;

  constructor(message: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AlreadyExists.prototype);

    this.message = message;
  }
}
