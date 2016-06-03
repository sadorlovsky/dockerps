import 'babel-polyfill'
import url from 'url'
import got from 'got'

async function dockerps (options, dockerAddress) {
  options = {
    all: false
  }
  dockerAddress = dockerAddress || 'unix:///var/run/docker.sock'

  const { body } = await got(
    `${dockerAddress}/containers/json`
  )
  return body
}

export default dockerps
