/**
 * Error constants
 */
const enum ErrorCode {
  COMMON = 'common',
  ENTITY_NOT_FOUND = 'entity_not_found',
  DATA_IS_REQUIRED = 'data_is_required'
}

const enum ErrorTarget {
  COMMON = 'common',
  FIELD = 'field'
}

export {
  ErrorCode,
  ErrorTarget
};
