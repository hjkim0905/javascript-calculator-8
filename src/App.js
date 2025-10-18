import { Console } from '@woowacourse/mission-utils';
import { DELIMITER } from './constants/delimiter.js';
import { REGEX } from './constants/regex.js';
import { ERROR_MESSAGE } from './constants/error.js';
import { MESSAGE } from './constants/message.js';

class App {
  async run() {
    let strArr = [];
    let result = 0;

    const input = await Console.readLineAsync(MESSAGE.INPUT_PROMPT);

    if (!input) {
      result = 0;
    } else if (!REGEX.HAS_NUMBER.test(input)) {
      throw new Error(ERROR_MESSAGE.NO_NUMBER);
    } else {
      const start = DELIMITER.CUSTOM_PREFIX;
      const startIndex = input.indexOf(start);
      const endIndex = input.indexOf(DELIMITER.CUSTOM_SUFFIX);

      if (startIndex !== -1 && endIndex !== -1) {
        const delimiter = input.substring(startIndex + start.length, endIndex);
        const escapedDelimiter = delimiter.replace(REGEX.ESCAPE_SPECIAL_CHAR, '\\$&');
        const delimiterSection = input.substring(startIndex, endIndex + 2);

        let replacedInput = input.replace(delimiterSection, '');
        if (
          !(
            replacedInput.includes(',') ||
            replacedInput.includes(':') ||
            (delimiter !== '' && replacedInput.includes(delimiter)) ||
            REGEX.ONLY_NUMBER.test(replacedInput)
          )
        ) {
          throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
        }

        strArr = replacedInput.split(new RegExp(`[${escapedDelimiter},:]`)).filter(Boolean);
      } else {
        strArr = input.split(DELIMITER.DEFAULT_REGEX);

        strArr.forEach((str) => {
          if (str !== ',' && str !== ':' && isNaN(str)) {
            throw new Error(ERROR_MESSAGE.INVALID_DELIMITER);
          }
        });
      }

      let numArr = strArr.map(Number);

      result = numArr.reduce(function (acc, cur) {
        if (acc < 0) {
          throw new Error(ERROR_MESSAGE.NEGATIVE_NUMBER);
        }
        return acc + cur;
      });
    }
    Console.print(MESSAGE.RESULT_PREFIX + result);
  }
}

export default App;
