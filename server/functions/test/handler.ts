/*tslint:disable: no-import-side-effect*/
import 'reflect-metadata';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { responseOk } from '@responses';
import { handleError } from '@errors/handle/handleError';
import { MailSystemParametersRequest } from '@valueObjects/email/mailSystemParametersRequest';
import { createInstance } from '@valueObjects/valueObjectFactory';

export async function main(event: APIGatewayEvent, context: Context, cb: Callback): Promise<any> {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const payload: MailSystemParametersRequest = createInstance(MailSystemParametersRequest, {});
    return responseOk(payload);
  } catch (e) {
    return handleError(e);
  }
}
