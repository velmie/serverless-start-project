import { ILogger } from '@logger/loggerInterface';

/**
 * @class Logger
 */
class Logger implements ILogger {
  /**
   * @type {Console}
   */
  private logger: Console = console;

  /**
   * @param {string} message
   * @param optionalParams
   */
  public debug(message: string, ...optionalParams: any[]): void {
    this.logger.log(message, optionalParams);
  }

  /**
   * @param {string} message
   * @param optionalParams
   */
  public warn(message: string, ...optionalParams: any[]): void {
    this.logger.warn(message, optionalParams);
  }

  /**
   * @param {string} message
   * @param optionalParams
   */
  public error(message: string, ...optionalParams: any[]): void {
    this.logger.error(message, optionalParams);
  }

  /**
   * @param {string} message
   * @param optionalParams
   */
  public info(message: string, ...optionalParams: any[]): void {
    this.logger.info(message, optionalParams);
  }
}

export const logger = new Logger();
