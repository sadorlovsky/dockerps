import path from 'path'
import test from 'ava'
import Mitm from 'mitm'
import fs from 'mz/fs'
import dockerps from '../src/dockerps'

const mitm = Mitm()

test('get running containers', async t => {
  const fixturePath = path.resolve('fixtures', 'containers.json')
  const containers = JSON.parse(await fs.readFile(fixturePath, { encoding: 'utf8' }))
    .filter(c => c['State'] === 'running')
  const expected = JSON.stringify(containers)

  mitm.on('request', (req, res) => {
    res.statusCode = 200
    res.end(expected)
  })

  const result = await dockerps()
  t.deepEqual(result, expected)
})

test('get all containers', async t => {
  const fixturePath = path.resolve('fixtures', 'containers.json')
  const expected = await fs.readFile(fixturePath, { encoding: 'utf8' })

  mitm.on('request', (req, res) => {
    res.statusCode = 200
    res.end(expected)
  })

  const result = await dockerps({ all: true })
  t.deepEqual(result, expected)
})
