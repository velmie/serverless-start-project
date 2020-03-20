import {getStage} from '@services/aws/misc/getStage';

/**
 * Generate public api route
 *
 * @param {number} versionNumber
 * @param {string} path
 * @param {string} params
 * @returns {string}
 */
const generatePublicApiRoute = (versionNumber: number, path: string, params: string = ''): string => {
  const baseRoute: string = process.env.basePublicWebRoute!;
  const stage: string = getStage();
  const version: string = 'v' + versionNumber;

  return baseRoute + '/' + stage + '/' + version + '/' + path + params;
};

export {
  generatePublicApiRoute
};
