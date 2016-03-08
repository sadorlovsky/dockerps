import _ from 'lodash'
import cli from './cli'
import execute from './execute'

export function generateOptions (cli) {
  const options = []
  const flags = cli.flags

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

export default function dockerps () {
  return execute(generateOptions(cli))
}
