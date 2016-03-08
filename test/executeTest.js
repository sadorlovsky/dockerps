import proxyquire from 'proxyquire'
import test from 'ava'
import 'babel-register'
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

test('execute("-a")', (t) => {
  stub.execSync = randomStdout
  t.ok(execute.execute('-a'))
})

test('parse no containers', (t) => {
  stub.execSync = (cmd) => ''
  const stdout = execute.execute()
  const expected = []
  t.same(JSON.stringify(execute.parse(stdout)), JSON.stringify(expected))
})

test('parse single container', (t) => {
  stub.execSync = (cmd) => 'abc123def456\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days'
  const stdout = execute.execute()
  const expected = [{
    id: 'abc123def456',
    name: 'mongo',
    image: 'mongo',
    command: '"./start.sh"',
    createdAt: '2016-02-26 17:28:39 +0300',
    runningFor: '5 days',
    status: 'Up 5 days',
    ports: undefined
  }]
  t.same(JSON.stringify(execute.parse(stdout)), JSON.stringify(expected))
})

test('parse two containers', (t) => {
  stub.execSync = (cmd) => {
    return 'abc123def456\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days\n' +
      'abc123def457\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days'
  }
  const stdout = execute.execute()
  const expected = [{
    id: 'abc123def456',
    name: 'mongo',
    image: 'mongo',
    command: '"./start.sh"',
    createdAt: '2016-02-26 17:28:39 +0300',
    runningFor: '5 days',
    status: 'Up 5 days',
    ports: undefined
  }, {
    id: 'abc123def457',
    name: 'mongo',
    image: 'mongo',
    command: '"./start.sh"',
    createdAt: '2016-02-26 17:28:39 +0300',
    runningFor: '5 days',
    status: 'Up 5 days',
    ports: undefined
  }]
  t.same(JSON.stringify(execute.parse(stdout)), JSON.stringify(expected))
})

test('parse two containers with newline char', (t) => {
  stub.execSync = (cmd) => {
    return 'abc123def456\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days\n' +
      'abc123def457\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days\n'
  }
  const stdout = execute.execute()
  const expected = [{
    id: 'abc123def456',
    name: 'mongo',
    image: 'mongo',
    command: '"./start.sh"',
    createdAt: '2016-02-26 17:28:39 +0300',
    runningFor: '5 days',
    status: 'Up 5 days',
    ports: undefined
  }, {
    id: 'abc123def457',
    name: 'mongo',
    image: 'mongo',
    command: '"./start.sh"',
    createdAt: '2016-02-26 17:28:39 +0300',
    runningFor: '5 days',
    status: 'Up 5 days',
    ports: undefined
  }]
  t.same(JSON.stringify(execute.parse(stdout)), JSON.stringify(expected))
})
