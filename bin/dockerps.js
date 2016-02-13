#!/usr/bin/env node
'use strict'

const meow = require('meow')
const _ = require('lodash')
const exec = require('child_process').exec
const print = require('../lib')

const cli = meow(`
  Usage
    $ dockerps [OPTIONS]

  Options
    -a, --all      Show all containers (default shows just running)
    -l, --latest   Show the latest created container, include non-running
    -n, --number   Show n last created containers, include non-running
    -v, --version  Show version
    -h, --help     Show usage
`,
  {
    alias: {
      a: 'all',
      l: 'latest',
      n: 'number',
      v: 'version',
      h: 'help'
    }
  }
)

const command = 'docker ps'

let options = ''

if (cli.flags.a) {
  options += '-a'
}

if (cli.flags.l) {
  options += '-l'
}

if (_.isNumber(cli.flags.n)) {
  options += `-n ${cli.flags.n}`
}

const formatOptions = [
  '{{.ID}}', '{{.Names}}', '{{.Image}}', '{{.Command}}',
  '{{.CreatedAt}}', '{{.RunningFor}}', '{{.Status}}', '{{.Ports}}'
]

exec(`${command} ${options} --format "${_.join(formatOptions, '|')}"`,
  (error, stdout, stderr) => {
    console.log(print(stdout))
    if (error !== null) {
      console.log(error)
    }
  }
)
