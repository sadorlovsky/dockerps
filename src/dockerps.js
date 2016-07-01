import 'babel-polyfill'
import got from 'got'

async function dockerps (options = {
  all: false,
  docker: 'http://unix:/var/run/docker.sock:'
}) {
  const { all, docker } = options
  const query = all ? '?all=true' : ''
  const { body } = await got(
    `${docker}/containers/json${query}`
  )
  return body
}

export default dockerps
