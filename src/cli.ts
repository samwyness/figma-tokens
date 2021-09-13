#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import dotenv from 'dotenv'
dotenv.config()

import { PACKAGE_NAME, PACKAGE_VERSION, setDebug } from './utils/constants'
import { init } from './commands/init'
import { sync } from './commands/sync'

export const start = () => {
  const program = new Command(PACKAGE_NAME)

  program.version(PACKAGE_VERSION, '-v, --vers', 'output the current version')

  program
    .command('info')
    .description('print environment info')
    .action(() => {
      console.log(chalk.bold('\nEnvironment Info:\n'))
      console.log(`  Package name: ${PACKAGE_NAME}`)
      console.log(`  Package version: ${chalk.green(PACKAGE_VERSION)}`)
      console.log(`  Working directory: '${__dirname}'`)
    })

  program
    .command('init')
    .description('Setup figma.yml')
    .action(() => init())

  program
    .command('sync')
    .description('Sync Figma tokens')
    .option('--verbose', 'output extra debugging')
    .action((options) => {
      if (options.verbose) {
        setDebug(true)
      }

      sync()
    })

  program.parse(process.argv)
}

start()
