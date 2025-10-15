import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    try {
      const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
      if (!input) {
        throw new Error('[ERROR] 빈 문자열입니다.');
      }
    } catch (e) {
      Console.print(e.message);
    }
  }
}

export default App;
