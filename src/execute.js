import child_process from 'child_process'

const format = () => [
  '{{.ID}}',
  '{{.Names}}',
  '{{.Image}}',
  '{{.Command}}',
  '{{.CreatedAt}}',
  '{{.RunningFor}}',
  '{{.Status}}',
  '{{.Ports}}'
].join('\t')

const exec = (options = '', _format = format()) => {
  return child_process.execSync(`docker ps ${options} --format "${_format}"`).toString()
}

const parse = (stdout) => {
  return stdout.split('\n')
    .filter((row) => row !== '')
    .map((row) => {
      const data = row.split('\t')
      return {
        id: data[0],
        name: data[1],
        image: data[2],
        command: data[3],
        createdAt: data[4],
        runningFor: data[5],
        status: data[6],
        ports: data[7]
      }
    })
}

export default function execute (options) {
  return parse(exec(options))
}
