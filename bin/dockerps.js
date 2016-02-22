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
    -f, --filter   Filter output based on these conditions:
                      - id=<ID> a container's ID
                      - name=<string> a container's name
                      - label=<key> or label=<key>=<value>
                      - status=(created|restarting|running|paused|exited)
                      - ancestor=(<image-name>[:tag]|<image-id>|<image@digest>)
                      - exited=<int> an exit code of <int>
    -v, --version  Show version
    -h, --help     Show usage
`,
  {
    alias: {
      a: 'all',
      l: 'latest',
      n: 'number',
      f: 'filter',
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

if (_.isString(cli.flags.f)) {
  options += `-f "${cli.flags.f}"`
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
