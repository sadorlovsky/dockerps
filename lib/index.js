'use strict'

const _ = require('lodash')
const execute = require('./execute')

function dockerps (cli) {
  const options = []

  if (cli.flags.all) {
    options.push('-a')
  }

  if (cli.flags.latest) {
    options.push('-l')
  }

  if (_.isNumber(cli.flags.number)) {
    options.push(`-n ${cli.flags.number}`)
  }

  if (_.isString(cli.flags.filter)) {
    options.push(`-f ${cli.flags.filter}`)
  }

  return execute(_.join(options, ' '))
}

module.exports = dockerps
