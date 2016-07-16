import path from 'path'
import test from 'ava'
import nock from 'nock'
import fs from 'mz/fs'
import dockerps from '../src/dockerps'

dockerps.__Rewire__('sock', 'http://docker.local')

test('get containers', async t => {
  const fixturePath = path.resolve('fixtures', 'containers.json')
  nock('http://docker.local')
    .get('/containers/json')
    .replyWithFile(200, fixturePath)

  const result = await dockerps()
  t.deepEqual(result, await fs.readFile(fixturePath, { encoding: 'utf8' }))
})
