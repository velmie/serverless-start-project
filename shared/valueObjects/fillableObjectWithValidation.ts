import {ValidationError} from '@errors/custom/validationError';
import {FieldErrorFactory} from '@errors/custom/misc/fieldErrorFactory';
import {FieldErrorCollectionGenerator} from '@errors/custom/misc/fieldErrorCollectionGenerator';
import {FieldErrorCollection} from '@errors/custom/fieldErrorCollection';
import {snakeCase} from '@helpers/snakeCase';
import {validateSync} from 'class-validator';
import {ErrorCode} from '@constants/errors';

/**
 * @class FillableObjectWithValidation
 */
export class FillableObjectWithValidation {

  /**
   * @param {object} data
   */
  protected fillObjectWithData(data: object): void {
    if (!data) {
      throw new ValidationError(`Data for ${this.constructor.name} is required`, ErrorCode.DATA_IS_REQUIRED)
        .addSource({ object: this.constructor.name });
    }

    Object.keys(this).forEach(key => {
      if (data[key] !== undefined) {
        this[key] = data[key];
      } else if (data[snakeCase(key)] !== undefined) {
        this[key] = data[snakeCase(key)];
      }
    });
  }

  /**
   * @param {object} options
   */
  protected validateObject(options?: object): void {
    const errors = validateSync(this, options);

    if (!errors.length) {
      return;
    }

    const factory: FieldErrorFactory = new FieldErrorFactory();
    const generator: FieldErrorCollectionGenerator = new FieldErrorCollectionGenerator(errors, factory);

    throw new FieldErrorCollection(generator.getErrors());
  }
}
