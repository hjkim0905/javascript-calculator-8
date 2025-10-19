import { ERROR_MESSAGE } from '../constants/error.js';
import { parseInput } from './Parser.js';

export function calculateSum(input) {
  const NUMBERS = parseInput(input);
  return sumNumbers(NUMBERS);
}

export function sumNumbers(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  return numbers.reduce(function (acc, cur) {
    if (acc < 0) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_NUMBER);
    }
    return acc + cur;
  });
}
