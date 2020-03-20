/**
 * Convert snake to camel case
 *
 * @param {string} str
 * @returns {string}
 */
export function snakeToCamelCase(str: string): string {
  return str.replace(/[-_]+([a-z0-9])/g, g => g[1].toUpperCase());
}
