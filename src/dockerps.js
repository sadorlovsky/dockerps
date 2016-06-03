import 'babel-polyfill'
import got from 'got'

async function dockerps (dockerAddress = 'unix:///var/run/docker.sock') {
  const data = await got(`${dockerAddress}/containers/json`)
  return data.body
}

export default dockerps
