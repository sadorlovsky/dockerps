import child_process from 'child_process'

const format = [
  '{{.ID}}',
  '{{.Names}}',
  '{{.Image}}',
  '{{.Command}}',
  '{{.CreatedAt}}',
  '{{.RunningFor}}',
  '{{.Status}}',
  '{{.Ports}}'
].join('\t')

function exec (options) {
  return child_process
    .execSync(`docker ps ${options} --format "${format}"`)
    .toString()
}

function ast (stdout) {
  return stdout.split('\n')
    .filter(row => row !== '')
    .map(row => {
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

export default function dockerps (options = { all: false }) {
  const stdout = exec(options)
  const result = ast(stdout)
  return result
}
