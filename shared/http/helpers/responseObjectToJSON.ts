import {ResponseJSON} from '@shared/http/responseJSON';
import { ResponceInterface } from '@shared/http/response/responceInterface';

export function responseObjectToJSON(statusCode: number, data: object): ResponceInterface {
  return new ResponseJSON(JSON.stringify(data), statusCode);
}
