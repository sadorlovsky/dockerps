'use strict'

const exec = require('child_process').execSync
const _ = require('lodash')
const outputConsole = require('./output')

function execute (options) {
  const formatOptions = [
    '{{.ID}}', '{{.Names}}', '{{.Image}}', '{{.Command}}',
    '{{.CreatedAt}}', '{{.RunningFor}}', '{{.Status}}', '{{.Ports}}'
  ]
  const format = _.join(formatOptions, '\t')

  const output = exec(`docker ps ${options} --format "${format}"`).toString()

  let containers = []

  for (let row of output.split('\n')) {
    if (row === '') continue
    const data = row.split('\t')
    let container = {
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

  return outputConsole(containers)
}

module.exports = execute
