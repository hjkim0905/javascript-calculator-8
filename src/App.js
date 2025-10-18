import { Console } from '@woowacourse/mission-utils';
import { calculateSum } from './domain/Calculator.js';
import { MESSAGE } from './constants/message.js';

class App {
  async run() {
    const INPUT = await Console.readLineAsync(MESSAGE.INPUT_PROMPT);
    const RESULT = calculateSum(INPUT);
    Console.print(MESSAGE.RESULT_PREFIX + RESULT);
  }
}

export default App;
