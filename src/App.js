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
      try {
        for (let i = 0; i < arr.length; i++) {
          const num = parseInt(arr[i]);

          if (!Number.isNaN(num) && num > 0) {
            result += num;
          } else {
            throw new Error('[ERROR] 입력된 문자열에 음수가 포함되어있습니다.');
          }
        }

        Console.print('결과 : ' + result);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}

export default App;
