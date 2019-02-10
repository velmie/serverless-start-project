import 'reflect-metadata';
import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import {responseOk} from '@responses';
import {parseJSON} from '@shared/http/helpers/parseJSON';
import {handleError} from '@errors/handle/handleError';
import { MailSystemParametersRequest } from '@valueObjects/email/mailSystemParametersRequest';

export async function main(event: APIGatewayEvent, context: Context, cb: Callback): Handler {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const payload = new MailSystemParametersRequest({});
    responseOk(cb, payload);
  } catch (e) {
    handleError(cb, e);
  }
}
