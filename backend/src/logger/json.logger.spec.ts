import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен корректно форматировать лог-сообщения', () => {
    const message = 'Тестовое сообщение';
    const context = 'TestContext';
    const formatted = logger['formatMessage']('log', message, context);

    const parsed = JSON.parse(formatted);
    expect(parsed).toHaveProperty('timestamp');
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe(message);
    expect(parsed.context).toBe(context);
  });

  it('должен логировать через console.log()', () => {
    const message = 'Тестовый лог';
    logger.log(message, 'TestContext');

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('"level":"log"'),
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(`"message":"${message}"`),
    );
  });

  it('должен логировать ошибки через console.error()', () => {
    const message = 'Ошибка в системе';
    const trace = 'Stack trace';
    logger.error(message, trace, 'ErrorContext');

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('"level":"error"'),
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(`"message":"${message}"`),
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(`"trace":"${trace}"`),
    );
  });

  it('должен логировать предупреждения через console.warn()', () => {
    const message = 'Предупреждение';
    logger.warn(message, 'WarnContext');

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('"level":"warn"'),
    );
  });

  it('должен логировать debug через console.debug()', () => {
    const message = 'Debug log';
    logger.debug(message, 'DebugContext');

    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.debug).toHaveBeenCalledWith(
      expect.stringContaining('"level":"debug"'),
    );
  });

  it('должен логировать verbose через console.info()', () => {
    const message = 'Verbose log';
    logger.verbose(message, 'VerboseContext');

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining('"level":"verbose"'),
    );
  });
});
