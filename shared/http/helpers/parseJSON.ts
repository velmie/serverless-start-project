import { logger } from '@logger/logger';
import { BadRequestError } from '@errors/custom/http/badRequestError';

export function parseJSON(json: string): any {
  try {
    return JSON.parse(json);
  } catch (e: Error) {
    logger.error('parseJSON', json);
    throw new BadRequestError(e);
  }
}
