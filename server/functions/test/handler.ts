/*tslint:disable: no-import-side-effect*/
import 'reflect-metadata';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { MailSystemParametersRequest } from '@valueObjects/email/mailSystemParametersRequest';
import { createInstance } from '@valueObjects/valueObjectFactory';
import { responseHandler } from '@shared/http/responseHandler';

class Handler {
  @responseHandler()
  public static async main(event: APIGatewayEvent, context: Context, cb: Callback): Promise<any> {
    context.callbackWaitsForEmptyEventLoop = false;
    return createInstance(MailSystemParametersRequest, {});
  }
}
export const main = Handler.main.bind(null);
