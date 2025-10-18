import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message.js';

export function printResult(result) {
  Console.print(MESSAGE.RESULT_PREFIX + result);
}
