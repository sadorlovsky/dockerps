import Table from 'cli-table2'
import chalk from 'chalk'
import moment from 'moment'
import _ from 'lodash'

export function createTable () {
  return new Table({
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
}

export function column (data) {
  const result = []
  _.forIn(data, (value, key) => {
    result.push(chalk.magenta(key), value)
  })
  return result.join('\n')
}

export default function outputConsole (containers) {
  if (containers.length === 0) {
    return noContainersMessage()
  }

  const table = createTable()

  containers.map((container) => {
    table.push([
      container.id,

      column({
        'Name': container.name,
        'Image': container.image,
        'Command': _.trim(container.command, '"')
      }),

      column({
        'Created': moment(container.createdAt).fromNow(),
        'Running for': container.runningFor,
        'Status': container.status
      }),

      _.replace(container.ports, ', ', '\n')
    ])
  })

  return table.toString()
}

export function noContainersMessage () {
  return chalk.magenta('There are no running containers.') + '\n' +
    `Use ${chalk.blue('-a, --all')} option to show all containers.`
}
