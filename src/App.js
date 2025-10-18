import { calculateSum } from './domain/Calculator.js';
import { readInput, printResult } from './domain/IOHandler.js';

class App {
  async run() {
    const INPUT = await readInput();
    const RESULT = calculateSum(INPUT);
    printResult(RESULT);
  }
}

export default App;
