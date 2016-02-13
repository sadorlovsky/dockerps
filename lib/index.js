'use strict'

const Table = require('cli-table2')
const _ = require('lodash')
const chalk = require('chalk')
const moment = require('moment')

function portsCol (ports) {
  return _.split(ports, ', ').join('\n')
}

function print (stdout) {
  if (stdout === '') {
    return `${chalk.magenta('There are no running containers.')}
Use ${chalk.blue('-a, --all')} option to show all containers.`
  }

  const table = new Table({
    head: [
      chalk.cyan('ID'),
      chalk.cyan('Container'),
      chalk.cyan('Status'),
      chalk.cyan('Ports')
    ],
    chars: {
      'top': '━', 'top-mid': '', 'top-left': '', 'top-right': '',
      'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
      'left': '', 'left-mid': '', 'mid': '━', 'mid-mid': '',
      'right': '', 'right-mid': '', 'middle': ''
    },
    style: { border: [], 'padding-left': 1, 'padding-right': 1 }
  })

  _.initial(stdout.split('\n')).map((row) => {
    const data = row.split('|')

    const id = data[0]
    const name = data[1]
    const image = data[2]
    const command = data[3]
    const created = data[4]
    const running = data[5]
    const status = data[6]
    const ports = data[7]

    table.push([
      id,
      `${chalk.magenta('Name')}
${chalk.bgWhite.black(name)}
${chalk.magenta('Image')}
${chalk.bgWhite.black(image)}
${chalk.magenta('Command')}
${chalk.bgWhite.black(command)}`,
      `${chalk.magenta('Created')}
${moment(created).fromNow()}
${chalk.magenta('Running for')}
${running}
${chalk.magenta('Status')}
${status}`,
      portsCol(ports)
    ])
  })
  return table.toString()
}

module.exports = print
