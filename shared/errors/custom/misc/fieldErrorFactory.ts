import {FieldError} from '@errors/custom/fieldError';
import {snakeCase} from '@helpers/snakeCase';
import {ValidationError as ValidatorError} from 'class-validator';

/**
 * @class FieldErrorFactory
 */
export class FieldErrorFactory {

  /**
   * @param {ValidationError} error
   * @param {string} key
   * @returns {FieldError}
   */
  public createByValidatorError(error: ValidatorError, key: string): FieldError {
    const message: string = error.constraints[key];
    const code: string = snakeCase(key);
    const field: string = error.property;

    return this.create(message, code, { field });
  }

  /**
   * @param {string} message
   * @param {string} code
   * @param {object} source
   * @returns {FieldError}
   */
  public create(message: string, code: string, source: object): FieldError {
    return new FieldError(message, code, source);
  }
}
