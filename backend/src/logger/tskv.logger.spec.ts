import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
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

    expect(formatted).toContain('level=log');
    expect(formatted).toContain(`message=${message}`);
    expect(formatted).toContain(`context=${context}`);
    expect(formatted).toMatch(/time=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('должен логировать через console.log()', () => {
    const message = 'Тестовый лог';
    logger.log(message);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('level=log'),
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(`message=${message}`),
    );
  });

  it('должен логировать ошибки через console.error()', () => {
    const message = 'Ошибка в системе';
    const trace = 'Stack trace';
    logger.error(message, trace);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('level=error'),
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(`message=${message}`),
    );
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(`trace=${trace}`),
    );
  });

  it('должен логировать предупреждения через console.warn()', () => {
    const message = 'Предупреждение';
    logger.warn(message);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('level=warn'),
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(`message=${message}`),
    );
  });

  it('должен логировать debug через console.debug()', () => {
    const message = 'Debug log';
    logger.debug(message);

    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.debug).toHaveBeenCalledWith(
      expect.stringContaining('level=debug'),
    );
  });

  it('должен логировать verbose через console.info()', () => {
    const message = 'Verbose log';
    logger.verbose(message);

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      expect.stringContaining('level=verbose'),
    );
  });
});
