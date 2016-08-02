import got from 'got'
import querystring from 'query-string'

const sock = 'http://unix:/var/run/docker.sock:'

const image = _image => {
  if (_image.startsWith('sha256:')) {
    return _image.substring(7, 19)
  }
  return _image
}

const ports = _ports => {
  if (_ports.length > 0) {
    return _ports.reduce((res, port) => {
      return res += `${port.PrivatePort}/${port.Type}, `
    }, '')
  }
  return ''
}

function dockerps (options) {
  const defaultOptions = {
    all: false,
    size: true
  }

  const _options = Object.assign({}, defaultOptions, options)

  return got(`${sock}/containers/json?${querystring.stringify(_options)}`)
    .then(res => JSON.parse(res.body))
    .then(containers => containers.map(container => ({
      id: container.Id.substring(0, 12),
      image: image(container.Image),
      name: ([...container.Names]).pop().substring(1),
      command: container.Command,
      created: container.Created,
      state: container.State,
      status: container.Status,
      ports: ports(container.Ports)
    })))
}

export default dockerps
