import { Console } from '@woowacourse/mission-utils';
import { DELIMITER } from './constants/delimiter.js';
import { REGEX } from './constants/regex.js';
import { ERROR_MESSAGE } from './constants/error.js';
import { MESSAGE } from './constants/message.js';

class App {
  async run() {
    let splittedStrings = [];
    let result = 0;

    const INPUT = await Console.readLineAsync(MESSAGE.INPUT_PROMPT);

    if (!INPUT) {
      result = 0;
      Console.print(MESSAGE.RESULT_PREFIX + result);
      return;
    }

    if (!REGEX.HAS_NUMBER.test(INPUT)) {
      throw new Error(ERROR_MESSAGE.NO_NUMBER);
    }

    const START = DELIMITER.CUSTOM_PREFIX;
    const START_INDEX = INPUT.indexOf(START);
    const END_INDEX = INPUT.indexOf(DELIMITER.CUSTOM_SUFFIX);

    if (START_INDEX !== -1 && END_INDEX !== -1) {
      const DELIMITER = INPUT.substring(START_INDEX + START.length, END_INDEX);
      const ESCAPED_DELIMITER = DELIMITER.replace(
        REGEX.ESCAPE_SPECIAL_CHAR,
        REGEX.ESCAPE_REPLACEMENT,
      );
      const DELIMITER_SECTION = INPUT.substring(START_INDEX, END_INDEX + 2);

      let replacedInput = INPUT.replace(DELIMITER_SECTION, '');
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

      Console.print(MESSAGE.RESULT_PREFIX + result);
      return;
    }

    splittedStrings = INPUT.split(DELIMITER.DEFAULT_REGEX);
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
    Console.print(MESSAGE.RESULT_PREFIX + result);
  }
}

export default App;
