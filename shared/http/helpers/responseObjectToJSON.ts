import { ResponseJSON } from '@shared/http/responseJSON';
import { IResponce } from '@shared/http/response/responceInterface';

export function responseObjectToJSON(statusCode: number, data: object): IResponce {
  return new ResponseJSON(JSON.stringify(data), statusCode);
}
