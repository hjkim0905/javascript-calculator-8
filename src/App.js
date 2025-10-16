import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    let result = 0;
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');

    if (!input) {
      result = 0;
    } else {
      let arr = input.split(/[,:]/);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
        result += arr[i];
      }
    }

    Console.print(result);
  }
}

export default App;
