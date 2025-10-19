import { DELIMITER } from '../constants/delimiter.js';
import { REGEX } from '../constants/regex.js';
import { ERROR_MESSAGE } from '../constants/error.js';

export function parseInput(input) {
  if (!input) {
    return [];
  }

  if (hasCustomDelimiter(input)) {
    return parseWithCustomDelimiter(input);
  }

  return parseWithDefaultDelimiter(input);
}

function hasCustomDelimiter(input) {
  return input.includes(DELIMITER.CUSTOM_PREFIX) && input.includes(DELIMITER.CUSTOM_SUFFIX);
}

function parseWithCustomDelimiter(input) {
  const customDelimiter = extractDelimiter(input);
  const content = extractContent(input);

  if (!isValidContent(content, customDelimiter)) {
    throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
  }

  const escapedDelimiter = customDelimiter.replace(
    REGEX.ESCAPE_SPECIAL_CHAR,
    REGEX.ESCAPE_REPLACEMENT,
  );

  const splittedStrings = content.split(new RegExp(`[${escapedDelimiter},:]`)).filter(Boolean);

  const numbers = splittedStrings.map(Number);

  if (numbers.some(isNaN)) {
    throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
  }

  return numbers;
}

function parseWithDefaultDelimiter(input) {
  const splittedStrings = input.split(DELIMITER.DEFAULT_REGEX);

  splittedStrings.forEach((str) => {
    if (str !== ',' && str !== ':' && isNaN(str)) {
      throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
    }
  });

  return splittedStrings.map(Number);
}

function extractDelimiter(input) {
  const start = DELIMITER.CUSTOM_PREFIX;
  const startIndex = input.indexOf(start);
  const endIndex = input.indexOf(DELIMITER.CUSTOM_SUFFIX);

  if (endIndex === -1) {
    return '';
  }

  return input.substring(startIndex + start.length, endIndex);
}

function extractContent(input) {
  const start = DELIMITER.CUSTOM_PREFIX;
  const startIndex = input.indexOf(start);
  const endIndex = input.indexOf(DELIMITER.CUSTOM_SUFFIX);

  if (endIndex === -1) {
    return input;
  }

  const delimiterSection = input.substring(startIndex, endIndex + 2);
  return input.replace(delimiterSection, '');
}

function isValidContent(content, customDelimiter) {
  if (REGEX.ONLY_NUMBER.test(content)) {
    return true;
  }

  return (
    content.includes(',') ||
    content.includes(':') ||
    (customDelimiter !== '' && content.includes(customDelimiter))
  );
}
