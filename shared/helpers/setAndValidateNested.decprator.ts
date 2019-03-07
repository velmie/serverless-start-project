import { Newable } from '@shared/interfaces/newable';
import { FillableObjectWithValidation } from '@valueObjects/fillableObjectWithValidation';
import { FieldErrorCollection } from '@errors/custom/fieldErrorCollection';
import { handleNestedErrors } from '@errors/handle/handleError';

export function setAndValidateNested<T extends FillableObjectWithValidation>(entityClass: Newable<T>): PropertyDecorator {
  return (target: any, propertyName: string) => {
    function f(isGet: boolean) {
      return function (newValue?: any) {
        /*tslint:disable: no-invalid-this*/
        if (!Object.getOwnPropertyDescriptor(this, propertyName)) {
          let value: T;
          /*tslint:disable: only-arrow-functions*/
          const getter = function () {
            return value;
          };
          const setter = function (val: any) {
            try {
              value = val ? new entityClass(val) : val;
            } catch (e) {
              if (e instanceof FieldErrorCollection) {
                throw handleNestedErrors(e, propertyName);
              }
              throw e;
            }
          };
          Object.defineProperty(this, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
          });
        }
        if (isGet) {
          return this[propertyName];
        } else {
          this[propertyName] = newValue;
        }
      };
    }

    Object.defineProperty(target, propertyName, {
      get: f(true),
      set: f(false),
      enumerable: false,
      configurable: false
    });
  };
}
