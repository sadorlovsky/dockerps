import meow from 'meow'
import Table from 'cli-table2'
import { stripIndent as strip } from 'common-tags'
import chalk from 'chalk'
import timeago from 'timeago.js'
import dockerps from './dockerps'

const cli = meow(`
  Usage
    $ dockerps [options]

  Options
    -a, --all         Show all containers (default shows just running)
    -n, --last <n>    Show n last created containers (includes non-running)
    -l, --latest      Show the latest created container (includes non-running)
    -v, --version     Print version
    -h, --help        Print usage
`,
  {
    alias: {
      a: 'all',
      l: 'latest',
      n: 'last',
      v: 'version',
      h: 'help'
    }
  }
)

const table = new Table({
  head: [chalk.blue('ID'), chalk.blue('Container'), chalk.blue('Status')],
  style: {
    head: []
  }
})

/* eslint-disable fp/no-mutation, no-param-reassign, complexity */
const flagsToDockerOptions = flags => {
  return Object.keys(flags).reduce((res, key) => {
    if (key === 'all') {
      res.all = flags[key]
    }

    if (key === 'latest') {
      res.limit = 1
    }

    if (key === 'last') {
      res.limit = flags[key]
    }

    return res
  }, {})
}
/* eslint-enable fp/no-mutation, no-param-reassign, complexity */

dockerps(flagsToDockerOptions(cli.flags)).then(containers => {
  if (containers.length === 0) {
    if (cli.flags.all) {
      console.log('no containers')
      process.exit(0)
    }
    console.log('no running containers')
    process.exit(0)
  }

  containers.forEach(container => {
    table.push([
      container.ports ? { rowSpan: 2, content: chalk.bold(container.id) } : chalk.bold(container.id),
      strip`
        ${chalk.magenta('Name')}
        ${container.name}
        ${chalk.magenta('Image')}
        ${container.image}
        ${chalk.magenta('Command')}
        ${container.command}`,
      strip`
        ${chalk.magenta('Created')}
        ${timeago().format(container.created * 1000)}
        ${chalk.magenta('State')}
        ${chalk.inverse(container.state)}
        ${chalk.magenta('Status')}
        ${container.status}`
    ])
    if (container.ports) {
      table.push([{
        content: `ports: ${container.ports}`,
        colSpan: 2,
        hAlign: 'center'
      }])
    }
  })
  console.log(table.toString())
  process.exit()
}).catch(e => {
  console.log(e)
  process.exit(1)
})
