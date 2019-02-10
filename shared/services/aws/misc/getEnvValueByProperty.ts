/**
 * @param {string} property
 * @return {Function}
 */
const getEnvValueByProperty = (property: string): string => {
  const value: string | undefined = process.env[property];

  if (typeof value === 'undefined') {
    throw new TypeError(`${property} can\`t be undefined`);
  }

  return value;
};

export {
  getEnvValueByProperty
};
