export class BadRequestError extends Error {
  public message: string;
  private error: Error;

  constructor(error: Error) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.message = error.message;
    this.error = error;
  }
}
