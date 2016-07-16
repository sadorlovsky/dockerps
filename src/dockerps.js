import got from 'got'

const sock = 'http://unix:/var/run/docker.sock:'

function dockerps () {
  return got(`${sock}/containers/json`).then(res => res.body)
}

export default dockerps
