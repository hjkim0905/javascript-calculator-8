import { DELIMITER } from '../constants/delimiter.js';
import { REGEX } from '../constants/regex.js';
import { ERROR_MESSAGE } from '../constants/error.js';

export function parseInput(input) {
  if (!input) {
    return [];
  }

  if (!REGEX.HAS_NUMBER.test(input)) {
    throw new Error(ERROR_MESSAGE.NO_NUMBER);
  }

  const START = DELIMITER.CUSTOM_PREFIX;
  const START_INDEX = input.indexOf(START);
  const END_INDEX = input.indexOf(DELIMITER.CUSTOM_SUFFIX);

  if (START_INDEX !== -1 && END_INDEX !== -1) {
    return parseWithCustomDelimiter(input);
  }

  return parseWithDefaultDelimiter(input);
}

function parseWithDefaultDelimiter(input) {
  const SPLITTED_STRINGS = input.split(DELIMITER.DEFAULT_REGEX);
  SPLITTED_STRINGS.forEach((str) => {
    if (str !== ',' && str !== ':' && isNaN(str)) {
      throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
    }
  });

  return SPLITTED_STRINGS.map(Number);
}

function parseWithCustomDelimiter(input) {
  const START = DELIMITER.CUSTOM_PREFIX;
  const START_INDEX = input.indexOf(START);
  const END_INDEX = input.indexOf(DELIMITER.CUSTOM_SUFFIX);

  const CUSTOM_DELIMITER = input.substring(START_INDEX + START.length, END_INDEX);
  const ESCAPED_DELIMITER = CUSTOM_DELIMITER.replace(
    REGEX.ESCAPE_SPECIAL_CHAR,
    REGEX.ESCAPE_REPLACEMENT,
  );
  const DELIMITER_SECTION = input.substring(START_INDEX, END_INDEX + 2);

  const REPLACED_INPUT = input.replace(DELIMITER_SECTION, '');
  if (
    !(
      REPLACED_INPUT.includes(',') ||
      REPLACED_INPUT.includes(':') ||
      (CUSTOM_DELIMITER !== '' && REPLACED_INPUT.includes(CUSTOM_DELIMITER)) ||
      REGEX.ONLY_NUMBER.test(REPLACED_INPUT)
    )
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
  }

  const SPLITTED_STRINGS = REPLACED_INPUT.split(new RegExp(`[${ESCAPED_DELIMITER},:]`)).filter(
    Boolean,
  );

  return SPLITTED_STRINGS.map(Number);
}
