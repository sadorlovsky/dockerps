import meow from 'meow'
import ora from 'ora'
import { simpleDotsScrolling } from 'cli-spinners'
import output from './output'
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

const spinner = ora({
  text: 'check containers',
  spinner: simpleDotsScrolling
})

setTimeout(() => {
  spinner.start()
}, 300)

dockerps(flagsToDockerOptions(cli.flags)).then(containers => {
  spinner.stop()
  const { result, status } = output(containers, cli.flags)
  console.log(result)
  process.exit(status)
}).catch(e => {
  console.log(e)
  process.exit(1)
})
