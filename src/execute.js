import child_process from 'child_process'
import _ from 'lodash'

export function optionsToString (flags) {
  const options = []

  if (flags.all || flags.a) {
    options.push('-a')
  }

  if (flags.latest || flags.l) {
    options.push('-l')
  }

  if (_.isNumber(flags.number || flags.n)) {
    options.push(`-n ${flags.number || flags.n}`)
  }

  if (_.isString(flags.filter || flags.f)) {
    options.push(`-f ${flags.filter || flags.f}`)
  }

  return options.join(' ')
}

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
