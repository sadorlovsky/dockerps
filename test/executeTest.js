import proxyquire from 'proxyquire'
import test from 'ava'
import { randomStdout } from './_helper'

const stub = {}
const execute = proxyquire('../src/execute', { 'child_process': stub })

test('format()', (t) => {
  const expected = '{{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Command}}\t{{.CreatedAt}}\t{{.RunningFor}}\t{{.Status}}\t{{.Ports}}'
  t.same(execute.format(), expected)
})

test('execute()', (t) => {
  stub.execSync = randomStdout
  t.ok(execute.execute())
})

test.skip('parse()', (t) => {
  stub.execSync = fakeStdout
  const stdout = execute.execute()
  t.same(execute.parse(stdout), '')
})
