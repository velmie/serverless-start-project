/**
 * Generate function name
 *
 * @param {string} serviceName
 * @param {string} stage
 * @param {string} functionName
 * @return {string}
 */
const generateFunctionName = (serviceName: string, stage: string, functionName: string): string =>
  `${serviceName}-${stage}-${functionName}`;

export {
  generateFunctionName
};
