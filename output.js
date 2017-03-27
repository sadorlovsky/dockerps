const Table = require('cli-table2')
const {stripIndent} = require('common-tags')
const chalk = require('chalk')
const timeago = require('timeago.js')

const table = new Table({
  head: [chalk.blue('ID'), chalk.blue('Container'), chalk.blue('Status')],
  style: {
    head: []
  }
})

const output = (containers, flags) => {
  if (containers.length === 0) {
    if (flags.all) {
      return {
        status: 0,
        result: 'no containers'
      }
    }
    return {
      status: 0,
      result: 'no running containers'
    }
  }

  containers.forEach(container => {
    table.push([
      container.ports.length > 0 ? {rowSpan: 2, content: chalk.bold(container.id)} : chalk.bold(container.id),
      stripIndent`
        ${chalk.magenta('Name')}
        ${container.name}
        ${chalk.magenta('Image')}
        ${container.image}
        ${chalk.magenta('Command')}
        ${container.command}`,
      stripIndent`
        ${chalk.magenta('Created')}
        ${timeago().format(container.created * 1000)}
        ${chalk.magenta('State')}
        ${chalk.inverse(container.state)}
        ${chalk.magenta('Status')}
        ${container.status}`
    ])
    if (container.ports.length > 0) {
      table.push([{
        content: container.ports.join(', '),
        colSpan: 2,
        hAlign: 'center'
      }])
    }
  })

  return {
    status: 0,
    result: table.toString()
  }
}

module.exports = output
