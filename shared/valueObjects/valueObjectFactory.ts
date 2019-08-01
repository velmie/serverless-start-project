/*tslint:disable: no-import-side-effect*/
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { FieldErrorFactory } from '@errors/custom/misc/fieldErrorFactory';
import { FieldErrorCollectionGenerator } from '@errors/custom/misc/fieldErrorCollectionGenerator';
import { FieldErrorCollection } from '@errors/custom/fieldErrorCollection';
import { ClassType } from '@shared/interfaces/classType';

export function createInstance<T>(className: ClassType<T>, data: object): T {
  const instance: T = plainToClass<T, object>(className, <object>data);

  const errors = validateSync(instance);
  if (!errors.length) {
    return instance;
  } else {
    const factory: FieldErrorFactory = new FieldErrorFactory();
    const generator: FieldErrorCollectionGenerator = new FieldErrorCollectionGenerator(errors, factory);
    throw new FieldErrorCollection(generator.getErrors());
  }
}
