/*tslint:disable: no-import-side-effect*/
import 'reflect-metadata';
import { EntityManager } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { connector } from '@shared/db/connector';

export class CustomEntityManager extends EntityManager {
  private static instance: CustomEntityManager;

  /**
   * @param {Connection} connection
   */
  private constructor(connection: Connection) {
    super(connection);
  }

  public static async getEntityManager() {
    if (!CustomEntityManager.instance) {
      const connection: Connection = await connector();

      CustomEntityManager.instance = new CustomEntityManager(connection);
    }

    return CustomEntityManager.instance;
  }
}
