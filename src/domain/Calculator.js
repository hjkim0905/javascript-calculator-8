import { DELIMITER } from '../constants/delimiter.js';
import { REGEX } from '../constants/regex.js';
import { ERROR_MESSAGE } from '../constants/error.js';

export function calculateSum(input) {
  let splittedStrings = [];
  let result = 0;

  if (!input) {
    result = 0;
    return result;
  }

  if (!REGEX.HAS_NUMBER.test(input)) {
    throw new Error(ERROR_MESSAGE.NO_NUMBER);
  }

  const START = DELIMITER.CUSTOM_PREFIX;
  const START_INDEX = input.indexOf(START);
  const END_INDEX = input.indexOf(DELIMITER.CUSTOM_SUFFIX);

  if (START_INDEX !== -1 && END_INDEX !== -1) {
    const DELIMITER = input.substring(START_INDEX + START.length, END_INDEX);
    const ESCAPED_DELIMITER = DELIMITER.replace(
      REGEX.ESCAPE_SPECIAL_CHAR,
      REGEX.ESCAPE_REPLACEMENT,
    );
    const DELIMITER_SECTION = input.substring(START_INDEX, END_INDEX + 2);

    let replacedInput = input.replace(DELIMITER_SECTION, '');
    if (
      !(
        replacedInput.includes(',') ||
        replacedInput.includes(':') ||
        (DELIMITER !== '' && replacedInput.includes(DELIMITER)) ||
        REGEX.ONLY_NUMBER.test(replacedInput)
      )
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
    }

    splittedStrings = replacedInput.split(new RegExp(`[${ESCAPED_DELIMITER},:]`)).filter(Boolean);

    const NUMBERS = splittedStrings.map(Number);
    result = NUMBERS.reduce(function (acc, cur) {
      if (acc < 0) {
        throw new Error(ERROR_MESSAGE.NEGATIVE_NUMBER);
      }
      return acc + cur;
    });

    return result;
  }

  splittedStrings = input.split(DELIMITER.DEFAULT_REGEX);
  splittedStrings.forEach((str) => {
    if (str !== ',' && str !== ':' && isNaN(str)) {
      throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
    }
  });

  const NUMBERS = splittedStrings.map(Number);
  result = NUMBERS.reduce(function (acc, cur) {
    if (acc < 0) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_NUMBER);
    }
    return acc + cur;
  });
  return result;
}
