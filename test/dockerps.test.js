import path from 'path'
import test from 'ava'
import Mitm from 'mitm'
import fs from 'mz/fs'
import dockerps from '../lib/dockerps'

test('running containers', async t => {
  const fixtures = JSON.stringify([{
    "Id": "123abc456def789ghi123jkl456mno789pqr123stu456vwx789yza123bcd456ef",
    "Names": ["/hello-world"],
    "Image": "hello-world",
    "Command": "/hello",
    "Created": 1000000,
    "Ports": [],
    "State": "running",
    "Status": "Up 5 minutes"
  }, {
    "Id": "abc456def789ghi123jkl456mno789pqr123stu456vwx789yza123bcd456ef123",
    "Names": ["/foobar"],
    "Image": "foo-bar",
    "Command": "ls -l",
    "Created": 2000000,
    "Ports": [{
      "PrivatePort": 2015,
      "Type": "tcp"
    }],
    "State": "running",
    "Status": "Up 25 minutes"
  }])

  const expected = [{
    id: '123abc456def',
    image: 'hello-world',
    name: 'hello-world',
    command: '/hello',
    created: 1000000,
    state: 'running',
    status: 'Up 5 minutes',
    ports: ''
  }, {
    id: 'abc456def789',
    image: 'foo-bar',
    name: 'foobar',
    command: 'ls -l',
    created: 2000000,
    state: 'running',
    status: 'Up 25 minutes',
    ports: '2015/tcp, ' // TODO: '2015/tcp'
  }]

  const mitm = Mitm()
  mitm.on('request', (req, res) => {
    res.statusCode = 200
    res.end(fixtures)
  })

  const result = await dockerps()
  t.deepEqual(result, expected)
})
