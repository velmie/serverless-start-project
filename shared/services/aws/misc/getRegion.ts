import {getEnvValueByProperty} from '@services/aws/misc/getEnvValueByProperty';
import { EnvironmentProperties } from '@constants/environmentProperties';

/**
 * Return current region
 *
 * @return {string}
 */
const getRegion = (): string => getEnvValueByProperty(EnvironmentProperties.REGION);

export {
  getRegion
};
