import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    let result = 0;
    let stringArr = [];
    let numArr = [];
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    if (!input) {
      result = 0;
    } else if (!/\d/.test(input)) {
      throw new Error('[ERROR] 입력된 문자열에 숫자가 포함되어있지 않습니다.');
    } else {
      const start = '//';
      const end = '\\n';
      const startIndex = input.indexOf(start);
      const endIndex = input.indexOf(end);

      if (startIndex !== -1 && endIndex !== -1) {
        const delimiter = input.substring(startIndex + start.length, endIndex);

        let replacedInput = input.replace(/\/|\\n/g, '');
        stringArr = replacedInput.split(new RegExp(`[${delimiter},:]`)).filter(Boolean);
      } else {
        stringArr = input.split(/[,:]/);
        for (let i = 0; i < stringArr.length; i++) {
          if ((stringArr[i] !== ',' || stringArr[i] !== ':') && isNaN(stringArr[i])) {
            throw new Error('[ERROR] 입력값에 구분자로 사용될 수 없는 문자열이 포함되어있습니다.');
          }
        }
      }

      stringArr.forEach((num) => {
        numArr.push(parseInt(num));
      });

      result = numArr.reduce(function (acc, cur) {
        if (acc < 0) {
          throw new Error('[ERROR] 입력된 문자열에 음수가 포함되어있습니다.');
        }
        return acc + cur;
      });

      Console.print('결과 : ' + result);
    }
  }
}

export default App;
