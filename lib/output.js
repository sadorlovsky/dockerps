'use strict'

const Table = require('cli-table2')
const chalk = require('chalk')
const moment = require('moment')
const _ = require('lodash')

function outputConsole (containers) {
  const table = new Table({
    head: [
      chalk.cyan('ID'),
      chalk.cyan('Container'),
      chalk.cyan('Status'),
      chalk.cyan('Ports')
    ],

    chars: {
      'top': '─', 'top-mid': '', 'top-left': '', 'top-right': '',
      'bottom': '─', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
      'left': '', 'left-mid': '', 'mid': '─', 'mid-mid': '',
      'right': '', 'right-mid': '', 'middle': ''
    },

    style: { border: [], 'padding-left': 1, 'padding-right': 1 }
  })

  containers.map((container) => {
    table.push([
      container.id,

      chalk.magenta('Name') + '\n' + container.name + '\n' +
      chalk.magenta('Image') + '\n' + container.image + '\n' +
      chalk.magenta('Command') + '\n' + _.trim(container.command, '"'),

      chalk.magenta('Created') + '\n' + moment(container.createdAt).fromNow() + '\n' +
      chalk.magenta('Running for') + '\n' + container.runningFor + '\n' +
      chalk.magenta('Status') + '\n' + container.status,

      _.replace(container.ports, ', ', '\n')
    ])
  })

  return table.toString()
}

module.exports = outputConsole
