import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    let strArr = [];
    let result = 0;

    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    if (!input) {
      result = 0;
    } else if (!/\d/.test(input)) {
      throw new Error('[ERROR] 입력된 문자열에 숫자가 포함되어있지 않습니다.');
    } else {
      const start = '//';
      const startIndex = input.indexOf(start);
      const endIndex = input.indexOf('\\n');

      if (startIndex !== -1 && endIndex !== -1) {
        const delimiter = input.substring(startIndex + start.length, endIndex);
        const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const delimiterSection = input.substring(startIndex, endIndex + 2);

        let replacedInput = input.replace(delimiterSection, '');
        if (
          !(
            replacedInput.includes(',') ||
            replacedInput.includes(':') ||
            (delimiter !== '' && replacedInput.includes(delimiter)) ||
            /^[0-9]+$/.test(replacedInput)
          )
        ) {
          throw new Error('[ERROR] 입력값에 구분자로 사용될 수 없는 문자열이 포함되어있습니다.');
        }

        strArr = replacedInput.split(new RegExp(`[${escapedDelimiter},:]`)).filter(Boolean);
      } else {
        strArr = input.split(/[,:]/);

        strArr.forEach((str) => {
          if (str !== ',' && str !== ':' && isNaN(str)) {
            throw new Error('[ERROR] 입력값에 구분자로 사용될 수 없는 문자열이 포함되어있습니다.');
          }
        });
      }

      let numArr = strArr.map(Number);

      result = numArr.reduce(function (acc, cur) {
        if (acc < 0) {
          throw new Error('[ERROR] 입력된 문자열에 음수가 포함되어있습니다.');
        }
        return acc + cur;
      });
    }
    Console.print('결과 : ' + result);
  }
}

export default App;
