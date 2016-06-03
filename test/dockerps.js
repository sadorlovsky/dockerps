import path from 'path'
import test from 'ava'
import nock from 'nock'
import fs from 'mz/fs'
import dockerps from '../src/dockerps'

const stub = {}
dockerps.__Rewire__('child_process', stub)

test('get containers', async t => {
  const fixturePath = path.resolve('fixtures', 'containers.json')
  nock('http://docker.local')
    .get('/containers/json')
    .replyWithFile(200, fixturePath)

  const result = await dockerps('http://docker.local')
  t.deepEqual(result, await fs.readFile(fixturePath, { encoding: 'utf8' }))
})
