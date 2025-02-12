import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен логировать через console.log()', () => {
    const message = 'Тестовый лог';
    const context = 'TestContext';

    logger.log(message, context);

    expect(console.log).toHaveBeenCalledTimes(1);

    const logArg = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
    expect(logArg.level).toBe('log');
    expect(logArg.message).toBe(message);
    expect(logArg.context).toBe(context);
  });

  it('должен логировать ошибки', () => {
    const message = 'Ошибка';
    const trace = 'Stack trace';
    const context = 'ErrorContext';

    logger.error(message, trace, context);

    expect(console.log).toHaveBeenCalledTimes(1);

    const logArg = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
    expect(logArg.level).toBe('error');
    expect(logArg.message).toBe(message);
    expect(logArg.trace).toBe(trace);
    expect(logArg.context).toBe(context);
  });

  it('должен логировать предупреждения', () => {
    const message = 'Предупреждение';
    const context = 'WarnContext';

    logger.warn(message, context);

    expect(console.log).toHaveBeenCalledTimes(1);

    const logArg = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
    expect(logArg.level).toBe('warn');
    expect(logArg.message).toBe(message);
    expect(logArg.context).toBe(context);
  });

  it('должен логировать debug', () => {
    const message = 'Debug log';
    const context = 'DebugContext';

    logger.debug(message, context);

    expect(console.log).toHaveBeenCalledTimes(1);

    const logArg = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
    expect(logArg.level).toBe('debug');
    expect(logArg.message).toBe(message);
    expect(logArg.context).toBe(context);
  });

  it('должен логировать verbose', () => {
    const message = 'Verbose log';
    const context = 'VerboseContext';

    logger.verbose(message, context);

    expect(console.log).toHaveBeenCalledTimes(1);

    const logArg = JSON.parse((console.log as jest.Mock).mock.calls[0][0]);
    expect(logArg.level).toBe('verbose');
    expect(logArg.message).toBe(message);
    expect(logArg.context).toBe(context);
  });
});
