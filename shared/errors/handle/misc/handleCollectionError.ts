import {Callback} from 'aws-lambda';
import {ErrorCollection} from '@errors/custom/misc/errorCollection';
import {validationErrorCollectionResp} from '@responseErrors';
import { ResponceInterface } from '@shared/http/response/responceInterface';

/**
 * @param {ErrorCollection} e
 * @returns {}
 */
export function handleCollectionError(e: ErrorCollection): ResponceInterface {
  return validationErrorCollectionResp(e);
}
