import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

describe('문자열 계산기 - 추가 테스트', () => {
  test('커스텀 구분자 (기본 구분자 포함) 사용', async () => {
    const inputs = ['//\\:\\n1\\:2'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 3'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('빈 문자열 입력', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('기본 구분자 쉼표와 콜론 혼합 사용', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('여러 개의 커스텀 구분자 사용', async () => {
    const inputs = ['//|\\n1|2|3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('음수 입력 시 에러 발생', async () => {
    const inputs = ['1,-2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('잘못된 커스텀 구분자 형식 에러', async () => {
    const inputs = ['//\\n1;2;3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('단일 숫자 입력', async () => {
    const inputs = ['5'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 5'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('큰 숫자들 계산', async () => {
    const inputs = ['100,200,300'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 600'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('0이 포함된 계산', async () => {
    const inputs = ['1,0,3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 4'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('여러 개의 0만 입력', async () => {
    const inputs = ['0,0,0'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('특수문자 커스텀 구분자 사용', async () => {
    const inputs = ['//@\\n1@2@3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('숫자 커스텀 구분자 사용', async () => {
    const inputs = ['//1\\n2123'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 25'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('여러 음수 포함 에러', async () => {
    const inputs = ['1,-2,-3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('모든 숫자가 음수인 경우 에러', async () => {
    const inputs = ['-1,-2,-3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('커스텀 구분자와 기본 구분자 혼합 사용', async () => {
    const inputs = ['//;\\n1;2,3:4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 10'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자와 기본 구분자 혼합 사용 (문자열 중간에 있을 때)', async () => {
    const inputs = ['1;2,//;\\n3:4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 10'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('소수점이 포함된 입력 계산', async () => {
    const inputs = ['1,2.5,3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6.5'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
