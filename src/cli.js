import meow from 'meow'
import dockerps from './index'

const cli = meow(`
  Usage
    $ dockerps [options]

  Options
    -a, --all         Show all containers (default shows just running)
    -l, --latest      Show the latest created container, include non-running
    -n, --number <n>  Show n last created containers, include non-running
    -f, --filter      Filter output based on these conditions:
                        - id=<ID> a container's ID
                        - name=<string> a container's name
                        - label=<key> or label=<key>=<value>
                        - status=(created|restarting|running|paused|exited)
                        - ancestor=(<image-name>[:tag]|<image-id>|<image@digest>)
                        - exited=<int> an exit code of <int>
    -v, --version     Show version
    -h, --help        Show usage
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

console.log(dockerps(cli))
