/**
 * @param {string} property
 * @return {Function}
 */
const getEnvValueByProperty = (property: string): string => {
  const value: undefined | string = process.env[property];

  if (value === undefined) {
    throw new TypeError(`${property} can\`t be undefined`);
  }

  return value;
};

export {
  getEnvValueByProperty
};
