import {getEnvValueByProperty} from '@services/aws/misc/getEnvValueByProperty';
import { EnvironmentProperties } from '@constants/environmentProperties';

/**
 * Return current stage
 *
 * @return {string}
 */
const getStage = (): string => getEnvValueByProperty(EnvironmentProperties.STAGE);

export {
  getStage
};
