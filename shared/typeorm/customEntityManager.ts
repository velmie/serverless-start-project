import 'reflect-metadata';
import { EntityManager } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { connector } from '@shared/db/connector';

/**
 * Custom entity manager
 */
export class CustomEntityManager extends EntityManager {

  private static instance: CustomEntityManager;

  /**
   * @param {Connection} connection
   */
  private constructor(connection: Connection) {
    super(connection);
  }

  /**
   * @return {Promise<CustomEntityManager>}
   */
  public static async getEntityManager() {
    if (!CustomEntityManager.instance) {
      const connection: Connection = await connector();

      CustomEntityManager.instance = new CustomEntityManager(connection);
    }

    return CustomEntityManager.instance;
  }
}
