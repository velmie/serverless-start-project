/**
 * Convert snake to camel case
 *
 * @param str
 */
const snakeToCamelCase = (str) => str.replace(/[-_]+([a-z0-9])/g, (g) => g[1].toUpperCase());

export {
  snakeToCamelCase
};
