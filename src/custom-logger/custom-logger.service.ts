import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { stat } from 'fs/promises';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

const LOG_LEVEL = {
  0: 'error',
  1: 'warn',
  2: 'log',
  3: 'verbose',
  4: 'debug',
};
@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private maxSizeFile: number;
  private errorLogFileName: string;
  private appLogFileName: string;
  private logLevel = 2;
  constructor() {
    super();
    this.maxSizeFile = Number(process.env.MAX_SIZE_LOG_FILE || 10000);
    this.errorLogFileName = Date.now() + '-error.log';
    this.appLogFileName = Date.now() + '-app.log';

    if (process.env.LOG_LEVEL === '0') this.logLevel = 0;
    if (process.env.LOG_LEVEL === '1') this.logLevel = 1;
    if (process.env.LOG_LEVEL === '3') this.logLevel = 3;
    if (process.env.LOG_LEVEL === '4') this.logLevel = 4;

    super.setLogLevels([LOG_LEVEL[this.logLevel]]);
  }

  error(message) {
    this.setNewLogFileName(this.errorLogFileName, 'error').catch();

    const log_file = fs.createWriteStream(
      __dirname + `/${this.errorLogFileName}`,
      {
        flags: 'a',
      },
    );
    log_file.write(`Timestamp: ${Date.now()} ${message}\n`);

    super.error(message);
  }

  log(message) {
    if (this.logLevel < 2) return;

    this.setNewLogFileName(this.appLogFileName, 'log').catch();

    const log_file = fs.createWriteStream(
      __dirname + `/${this.appLogFileName}`,
      {
        flags: 'a',
      },
    );
    log_file.write(`Timestamp: ${Date.now()} ${message}\n`);

    super.log(message);
  }

  criticalError(message) {
    super.error(message);

    fs.writeFileSync(
      __dirname + `/${this.errorLogFileName}`,
      `Timestamp: ${Date.now()} ${message}\n`,
      {
        flag: 'a',
      },
    );
  }

  private async setNewLogFileName(
    filename,
    logName: 'log' | 'error',
  ): Promise<void> {
    await stat(__dirname + '/' + filename)
      .then((value) => {
        if (value.size >= this.maxSizeFile) {
          if (logName === 'error')
            this.errorLogFileName = Date.now() + '-error.log';
          this.appLogFileName = Date.now() + '-app.log';
        }
      })
      .catch(() => {
        return;
      });
  }
}
