import test from 'ava'
import { stripIndent as strip } from 'common-tags'
import stripAnsi from 'strip-ansi'
import output from '../src/output'

test('no running containers', t => {
  const { result } = output([], { all: false })
  t.is(result, 'no running containers')
})

test('no containers', t => {
  const { result } = output([], { all: true })
  t.is(result, 'no containers')
})

test(t => {
  const { result } = output(
    [{
      id: '123abc456def',
      image: 'hello-world',
      name: 'hello-world',
      command: '/hello',
      created: 1000000,
      state: 'running',
      status: 'Up 5 minutes',
      ports: []
    }, {
      id: 'abc456def789',
      image: 'foo-bar',
      name: 'foobar',
      command: 'ls -l',
      created: 2000000,
      state: 'running',
      status: 'Up 25 minutes',
      ports: ['2015/tcp']
    }, {
      id: '456def789ghi',
      image: 'def789ghi123',
      name: 'without-image-name',
      command: 'bash',
      created: 40000000,
      state: 'running',
      status: 'Up 55 minutes',
      ports: ['0.0.0.0:2014 -> 2015/tcp']
    }]
  )
  const expected = strip`
  ┌──────────────┬────────────────────┬───────────────┐
  │ ID           │ Container          │ Status        │
  ├──────────────┼────────────────────┼───────────────┤
  │ 123abc456def │ Name               │ Created       │
  │              │ hello-world        │ 46 years ago  │
  │              │ Image              │ State         │
  │              │ hello-world        │ running       │
  │              │ Command            │ Status        │
  │              │ /hello             │ Up 5 minutes  │
  ├──────────────┼────────────────────┼───────────────┤
  │ abc456def789 │ Name               │ Created       │
  │              │ foobar             │ 46 years ago  │
  │              │ Image              │ State         │
  │              │ foo-bar            │ running       │
  │              │ Command            │ Status        │
  │              │ ls -l              │ Up 25 minutes │
  │              ├────────────────────┴───────────────┤
  │              │              2015/tcp              │
  ├──────────────┼────────────────────┬───────────────┤
  │ 456def789ghi │ Name               │ Created       │
  │              │ without-image-name │ 45 years ago  │
  │              │ Image              │ State         │
  │              │ def789ghi123       │ running       │
  │              │ Command            │ Status        │
  │              │ bash               │ Up 55 minutes │
  │              ├────────────────────┴───────────────┤
  │              │      0.0.0.0:2014 -> 2015/tcp      │
  └──────────────┴────────────────────────────────────┘
`
  t.is(stripAnsi(result), expected)
})
