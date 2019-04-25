import * as AWS from 'aws-sdk';
import { LambdaInvoke } from '@constants/lambda';
import { LambdaInvokeError } from '@errors/custom/lambdaInvokeError';
import { ILambdaRequestPayloadInterface } from '@services/aws/misc/lambdaRequestPayloadInterface';
import { getRegion } from '@services/aws/misc/getRegion';
import { isStatusCodeSuccess } from '@helpers/http/isStatusCodeSuccess';
import { logger } from '@logger/logger';

/**
 * Invoke lambda function
 *
 * @param {string} functionName
 * @param {Object} params
 * @return {Promise}
 */
export async function lambdaInvoke(functionName: string, params: object = {}) {
  const lambda = new AWS.Lambda({ region: getRegion() });
  const request: any = await lambda.invoke({
    FunctionName: functionName,
    Payload: JSON.stringify(params)
  }).promise();

  if (!Object.prototype.hasOwnProperty.call(request, LambdaInvoke.PAYLOAD)) {
    throw new Error(`Error on invoke lambda function ${functionName}`);
  }

  const requestPayload: ILambdaRequestPayloadInterface = JSON.parse(request.Payload);

  if (Object.prototype.hasOwnProperty.call(request, LambdaInvoke.FUNCTION_ERROR)) {
    logger.error(`Error on invoke lambda function ${functionName}`, request.Payload);

    throw new Error(requestPayload.errorMessage);
  }

  if (Object.prototype.hasOwnProperty.call(requestPayload, 'statusCode') &&
    !isStatusCodeSuccess(requestPayload.statusCode)) {
    throw new LambdaInvokeError(requestPayload);
  }

  return requestPayload;
}
