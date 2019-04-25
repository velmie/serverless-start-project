import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { validationErrorCollectionResp } from '@responseErrors';
import { IResponce } from '@shared/http/response/responceInterface';

/**
 * @param {ErrorCollection} e
 * @returns {}
 */
export function handleCollectionError(e: ErrorCollection): IResponce {
  return validationErrorCollectionResp(e);
}
