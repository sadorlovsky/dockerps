import child_process from 'child_process'
import chalk from 'chalk'
import outputConsole from './output'

export function format () {
  return [
    '{{.ID}}',
    '{{.Names}}',
    '{{.Image}}',
    '{{.Command}}',
    '{{.CreatedAt}}',
    '{{.RunningFor}}',
    '{{.Status}}',
    '{{.Ports}}'
  ].join('\t')
}

export function execute (options) {
  return child_process.execSync(`docker ps ${options || ''} --format "${format()}"`).toString()
}

export function parse (stdout) {
  const containers = []

  for (let row of stdout.split('\n')) {
    if (row === '') continue
    const data = row.split('\t')
    const container = {
      id: data[0],
      name: data[1],
      image: data[2],
      command: data[3],
      createdAt: data[4],
      runningFor: data[5],
      status: data[6],
      ports: data[7]
    }
    containers.push(container)
  }

  return containers
}

export default function (options) {
  const stdout = execute(options)
  const containers = parse(stdout)

  if (containers.length === 0) {
    return chalk.magenta('There are no running containers.') + '\n' +
      `Use ${chalk.blue('-a, --all')} option to show all containers.`
  }

  return outputConsole(containers)
}
