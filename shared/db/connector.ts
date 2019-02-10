import 'reflect-metadata';
import { Connection, createConnection, getConnection } from 'typeorm';
import { CustomNamingStrategy } from '@shared/typeorm/customNamingStrategy';
import { logger } from '@logger/logger';

const CONNECTION_TYPE = 'postgres';

/**
 * Create db connection
 *
 * @return {Promise<Connection>}
 */
const createDbConnection = () =>
  createConnection({
    name: process.env.connectionName,
    type: CONNECTION_TYPE,
    host: process.env.host,
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    entities: [
      ],
    synchronize: false,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
  });

/**
 * Db connector
 *
 * @return {Promise<Connection>}
 */
const connector = async (): Promise<Connection> => {
  let connection: Connection | undefined;

  try {
    connection = await getConnection(process.env.connectionName);
  } catch (e) {
    // empty
  }

  try {
    if (typeof connection === 'undefined') {
      return createDbConnection();
    } else {
      return connection;
    }
  } catch (e) {
    logger.error(e.message, e);
    throw e;
  }
};

export {
  connector
};
