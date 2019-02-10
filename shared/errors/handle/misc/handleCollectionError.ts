import {Callback} from 'aws-lambda';
import {ErrorCollection} from '@errors/custom/misc/errorCollection';
import {validationErrorCollectionResp} from '@responseErrors';

/**
 * @param {} cb
 * @param {ErrorCollection} e
 * @returns {}
 */
export function handleCollectionError(cb: Callback, e: ErrorCollection) {
  return validationErrorCollectionResp(cb, e);
}
