import { Console } from '@woowacourse/mission-utils';
import { calculateSum } from './domain/Calculator.js';
import { MESSAGE } from './constants/message.js';
import { printResult } from './domain/ResultHandler.js';

class App {
  async run() {
    const INPUT = await Console.readLineAsync(MESSAGE.INPUT_PROMPT);
    const RESULT = calculateSum(INPUT);
    printResult(RESULT);
  }
}

export default App;
