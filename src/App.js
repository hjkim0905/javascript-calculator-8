import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    let result = 0;
    let arr = [];
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    if (!input) {
      result = 0;
    } else {
      const start = '//';
      const end = '\\n';
      const startIndex = input.indexOf(start);
      const endIndex = input.indexOf(end);

      if (startIndex !== -1 && endIndex !== -1) {
        const delimiter = input.substring(startIndex + start.length, endIndex);

        let replacedInput = input.replace(/\/|\\n/g, '');
        arr = replacedInput.split(new RegExp(`[${delimiter},:]`));
      } else {
        arr = input.split(/[,:]/);
      }

      for (let i = 0; i < arr.length; i++) {
        const num = parseInt(arr[i]);
        if (!isNaN(num)) {
          result += num;
        }
      }
    }

    Console.print('결과 : ' + result);
  }
}

export default App;
