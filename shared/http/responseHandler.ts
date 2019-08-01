import { IResponce } from '@shared/http/response/responceInterface';
import { respondNoContent, Response, responseOk } from '@responses';
import { logger } from '@logger/logger';
import { handleError } from '@errors/handle/handleError';
import { isEmpty } from '@helpers/isEmpty';

export function responseHandler() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]): Promise<IResponce> {
      let response: IResponce;
      try {
        // tslint:disable-next-line
        const res: Response | object = await originalMethod.apply(this, args);
        if (res instanceof Response) {
          response = res.responseCallback();
        } else if (isEmpty(res)) {
          response = respondNoContent();
        } else {
          response = responseOk(res);
        }
      } catch (e) {
        logger.error('response error: ', {
          message: e.message,
          type: e.errorType || e.constructor.name,
          stack: e.stack.split('\n')
        });
        response = handleError(e);
      }
      logger.debug('response handler', { response });
      return response;
    };
    return descriptor;
  };
}
