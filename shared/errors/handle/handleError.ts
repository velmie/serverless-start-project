import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { handleCollectionError } from '@errors/handle/misc/handleCollectionError';
import { handleSingleError } from '@errors/handle/misc/handleSingleError';
import { IResponce } from '@shared/http/response/responceInterface';
import { FieldErrorCollection } from '@errors/custom/fieldErrorCollection';
import { FieldError } from '@errors/custom/fieldError';

/**
 * @param {Error | ErrorCollection} e
 * @returns {IResponce}
 */
export function handleError(e: Error | ErrorCollection): IResponce {
  if (e instanceof ErrorCollection) {
   return handleCollectionError(<ErrorCollection> e);
  } else {
   return handleSingleError(<Error> e);
  }
}

/**
 * @param {FieldErrorCollection} e
 * @param {string} parentFieldName
 * @returns {FieldErrorCollection}
 */
export function handleNestedErrors(e: FieldErrorCollection, parentFieldName: string): FieldErrorCollection {
  e.errors.forEach((error: FieldError) => {
    (<{ field: string }>error.source).field = `${parentFieldName}.${(<{ field: string }>error.source).field}`;
  });
  return e;
}
