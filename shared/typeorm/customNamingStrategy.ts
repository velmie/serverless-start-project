import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { pluralCamelCase, singularSnakeCase } from 'shared/typeorm/pluralizeWord';
import { snakeCase } from '@helpers/snakeCase';
import { logger } from '@logger/logger';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * @param {string} targetName
   * @param {string} userSpecifiedName
   * @return {string}
   */
  public tableName(targetName: string, userSpecifiedName: string): string {
    try {
      if (userSpecifiedName) {
        return userSpecifiedName;
      }

      return snakeCase(pluralCamelCase(targetName));
    } catch (e: Error) {
      logger.error(e.message, e);
      throw e;
    }
  }

  /**
   * @param {string} propertyName
   * @param {string} customName
   * @param {string[]} embeddedPrefixes
   * @return {string}
   */
  public columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return customName ? customName : snakeCase(embeddedPrefixes.concat(propertyName).join('_'));
  }

  /**
   * @param {string} propertyName
   * @return {string}
   */
  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  /**
   * @param {string} relationName
   * @param {string} referencedColumnName
   * @return {string}
   */
  public joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  /**
   * @param firstTableName
   * @param secondTableName
   * @param firstPropertyName
   * @param secondPropertyName
   */
  public joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string,
                       secondPropertyName: string): string {
    return snakeCase(firstTableName + '_' + secondTableName);
  }

  /**
   * @param {string} tableName
   * @param {string} propertyName
   * @param {string} columnName
   * @return {string}
   */
  public joinTableColumnName(tableName: string, propertyName: string, columnName: string): string {
    try {
      return snakeCase(singularSnakeCase(tableName) + '_' + (columnName ? columnName : propertyName));
    } catch (e: Error) {
      logger.error(e.message, e);
      throw e;
    }
  }

  /**
   * @param parentTableName
   * @param parentTableIdPropertyName
   * @return {string}
   */
  public classTableInheritanceParentColumnName(parentTableName: string, parentTableIdPropertyName: string): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }
}
