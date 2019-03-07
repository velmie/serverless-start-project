import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { handleCollectionError } from '@errors/handle/misc/handleCollectionError';
import { handleSingleError } from '@errors/handle/misc/handleSingleError';
import { ResponceInterface } from '@shared/http/response/responceInterface';
import { FieldErrorCollection } from '@errors/custom/fieldErrorCollection';
import { FieldError } from '@errors/custom/fieldError';

/**
 * @param {Error} e
 * @returns {}
 */
export function handleError(e: Error | ErrorCollection): ResponceInterface {
  if (e instanceof ErrorCollection) {
   return handleCollectionError(<ErrorCollection> e);
  } else {
   return handleSingleError(<Error> e);
  }
}

export function handleNestedErrors(e: FieldErrorCollection, parentFieldName: string): FieldErrorCollection {
  e.errors.forEach((error: FieldError) => {
    (<{ field: string }>error.source).field = `${parentFieldName}.${(<{ field: string }>error.source).field}`;
  });
  return e;
}
