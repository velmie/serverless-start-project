/**
 * Convert snake to camel case
 *
 * @param str
 */
export function snakeToCamelCase(str: string) {
  return str.replace(/[-_]+([a-z0-9])/g, g => g[1].toUpperCase());
}
