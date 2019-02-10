import {Callback} from 'aws-lambda';
import {ErrorCollection} from '@errors/custom/misc/errorCollection';
import {handleCollectionError} from '@errors/handle/misc/handleCollectionError';
import {handleSingleError} from '@errors/handle/misc/handleSingleError';

/**
 * @param {} cb
 * @param {Error} e
 * @returns {}
 */
export function handleError(cb: Callback, e: Error | ErrorCollection) {
  if (e instanceof ErrorCollection) {
    handleCollectionError(cb, <ErrorCollection> e);
  } else {
    handleSingleError(cb, <Error> e);
  }
}
