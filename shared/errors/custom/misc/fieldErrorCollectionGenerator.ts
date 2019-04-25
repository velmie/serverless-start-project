import { FieldErrorFactory } from '@errors/custom/misc/fieldErrorFactory';
import { FieldError } from '@errors/custom/fieldError';
import { ValidationError as ValidatorError } from 'class-validator';

/**
 * @class FieldErrorCollectionGenerator
 */
export class FieldErrorCollectionGenerator {
  public fieldErrors: FieldError[];
  public factory: FieldErrorFactory;

  /**
   * @param {ValidationError[]} errors
   * @param {FieldErrorFactory} factory
   */
  public constructor(errors: ValidatorError[], factory: FieldErrorFactory) {
    if (!errors.length) {
      new Error('ValidatorError[] is empty');
    }

    this.fieldErrors = [];
    this.factory = factory;

    this.generateErrors(errors);
  }

  /**
   * @returns {FieldError[]}
   */
  public getErrors(): FieldError[] {
    return this.fieldErrors;
  }

  /**
   * @param {ValidationError[]} errors
   */
  private generateErrors(errors: ValidatorError[]): void {
    for (const error of errors) {
      this.generateErrorsByField(error);
    }
  }

  /**
   * @param {ValidationError} error
   */
  private generateErrorsByField(error: ValidatorError): void {
    for (const key of Object.keys(error.constraints)) {
      this.fieldErrors.push(this.factory.createByValidatorError(error, key));
    }
  }
}
