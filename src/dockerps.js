import got from 'got'
import querystring from 'query-string'

const sock = 'http://unix:/var/run/docker.sock:'

function dockerps (options) {
  const _options = Object.assign({}, {
    all: false
  }, options)

  return got(`${sock}/containers/json?${querystring.stringify(_options)}`)
    .then(res => res.body)
    .catch(err => console.log(err))
}

export default dockerps
