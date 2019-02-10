import {ResponseJSON} from '@shared/http/responseJSON';

export function responseObjectToJSON(statusCode: number, data: object) {
  return new ResponseJSON(JSON.stringify(data), statusCode);
}