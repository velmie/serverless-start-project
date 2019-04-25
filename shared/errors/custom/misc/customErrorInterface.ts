/**
 * @interfaceICustomError
 */
interface ICustomError {
  readonly code: string;
  readonly target: string;
  readonly message?: string;
  readonly source?: object;
}

function isCustomErrorInterface(object: object): boolean {
  return object.hasOwnProperty('code') && object.hasOwnProperty('target');
}

export {
 ICustomError,
  isCustomErrorInterface
};
