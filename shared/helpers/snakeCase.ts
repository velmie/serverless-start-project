/**
 * Snake case
 * And to regexp 0-9
 *
 * @param {string} str
 * @returns {string}
 */
const snakeCase = (str: string): string => {
  return str.replace(/(?:^|\.?)([A-Z0-9])/g, (e, t) => {
    return '_' + t.toLowerCase();
  }).replace(/^_/, '');
};

export {
  snakeCase
};
