import chalk from 'chalk'
import { DEBUG } from '../utils/constants'
import { logMessages } from '../utils/logMessages'

const LogLevel = {
  INFO: 'INFO:',
  WARN: 'WARN:',
  ERROR: 'ERROR:',
  DEBUG: 'DEBUG:',
}

export const log = {
  messages: logMessages,
  info: (message: string) => console.log(chalk.bgGreenBright.black(LogLevel.INFO) + ' ' + message),
  warn: (message: string) => console.log(chalk.bgYellowBright.black(LogLevel.WARN) + ' ' + message),
  error: (message: string) => console.log(chalk.bgRedBright.black(LogLevel.ERROR) + ' ' + message),
  debug: (input: any, ...params: any) => {
    if (DEBUG) console.debug(chalk.bgBlueBright.black(LogLevel.DEBUG), input, ...params)
  },
}
