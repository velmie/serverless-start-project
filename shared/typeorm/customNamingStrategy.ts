import {NamingStrategyInterface, DefaultNamingStrategy} from 'typeorm';
import {pluralCamelCase, singularSnakeCase} from 'shared/typeorm/pluralizeWord';
import {snakeCase} from '@helpers/snakeCase';
import {logger} from '@logger/logger';

/**
 * Custom naming strategy
 */
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
    } catch (e) {
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
    } catch (e) {
      logger.error(e.message, e);
      throw e;
    }
  }

  /**
   * @param parentTableName
   * @param parentTableIdPropertyName
   * @return {string}
   */
  public classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }

  /*  public closureJunctionTableName(originalClosureTableName: string): string {
      return super.closureJunctionTableName(originalClosureTableName);
    }*/

  /*  public indexName(customName: string | any, tableName: string, columns: string[]): string {
      return super.indexName(customName, tableName, columns);
    }*/

  /*  public joinTableColumnDuplicationPrefix(columnName: string, index: number): string {
      return super.joinTableColumnDuplicationPrefix(columnName, index);
    }*/

  /*  public joinTableInverseColumnName(tableName: string, propertyName: string, columnName?: string): string {
      return super.joinTableInverseColumnName(tableName, propertyName, columnName);
    }*/

  /*  public foreignKeyName(tableName: string, columnNames: string[], referencedTableName: string,
  referencedColumnNames: string[]): string {
      return super.foreignKeyName(tableName, columnNames, referencedTableName, referencedColumnNames);
    }*/

  /*  public prefixTableName(prefix: string, tableName: string): string {
      return super.prefixTableName(prefix, tableName);
    }*/
}
