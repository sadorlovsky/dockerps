import test from 'ava'
import proxyquire from 'proxyquire'

const stub = {}
const dockerps = proxyquire('../src/dockerps', { 'child_process': stub })

test('no containers', t => {
  stub.execSync = (cmd) => ''
  t.deepEqual(dockerps({}), [])
})

test('single container', (t) => {
  stub.execSync = (cmd) => 'abc123def456\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days'
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
  t.deepEqual(dockerps({}), expected)
})

test('two containers', (t) => {
  stub.execSync = (cmd) => {
    return 'abc123def456\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days\n' +
      'abc123def457\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days'
  }
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
  t.deepEqual(dockerps({}), expected)
})

test('two containers with the newline char', (t) => {
  stub.execSync = (cmd) => {
    return 'abc123def456\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days\n' +
      'abc123def457\tmongo\tmongo\t\"./start.sh\"\t2016-02-26 17:28:39 +0300\t5 days\tUp 5 days\n'
  }
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
  t.deepEqual(dockerps({}), expected)
})
