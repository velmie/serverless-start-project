import {getStage} from '@services/aws/misc/getStage';
import {lambdaInvoke} from '@services/aws/lambdaInvoke';
import {generateFunctionName} from '@services/aws/misc/generateFunctionName';

/**
 * @param {string} functionName
 * @param {object} params
 */
export function invokeInternal(functionName: string, serviceName: string, params: object = {}) {
  const internalFunctionName: string =
    generateFunctionName(serviceName, getStage(), functionName);

  return lambdaInvoke(internalFunctionName, params);
}
