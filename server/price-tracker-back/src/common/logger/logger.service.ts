import * as winston from 'winston';

export class LoggerService {
  private readonly logger: winston.Logger;

  public constructor() {
    const format = this.isProductionEnv()
      ? winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        )
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        );

    this.logger = winston.createLogger({
      level: 'info',
      silent: this.isTestEnv(),
      format,
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error'],
        }),
        new winston.transports.File({ filename: 'application.log' }),
      ],
    });
  }

  public log(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string, context?: string) {
    this.logger.warn({ message, context });
  }

  private isTestEnv(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  private isProductionEnv(): boolean {
    return (
      process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging'
    );
  }
}
