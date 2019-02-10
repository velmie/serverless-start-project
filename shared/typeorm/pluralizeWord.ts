import * as plrz from 'pluralize';

/**
 * Plural camelCase word
 * @example bodyPositions to bodyPosition

 *
 * @param {string} word
 * @return {string}
 */
const pluralCamelCase = (word: string): string => {
  const splitWord: string[] = word.split(/(?=[A-Z])/); // split camelCase word
  const length: number = splitWord.length;

  if (length === 1) {
    return plrz(word);
  }

  splitWord[length - 1] = plrz(splitWord[length - 1]);
  return splitWord.join('');
};

/**
 * Singular snakeCase word
 * @example body_positions to body_position
 *
 * @param {string} word
 * @return {string}
 */
const singularSnakeCase = (word: string): string => {
  const splitWord: string[] = word.split('_'); // split snakeCase word
  const length: number = splitWord.length;

  if (length === 1) {
    return plrz(word, 1);
  }

  splitWord[length - 1] = plrz(splitWord[length - 1], 1);
  return splitWord.join('_');
};

export {
  pluralCamelCase,
  singularSnakeCase
};
