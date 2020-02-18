import test from 'ava'
import stripAnsi from 'strip-ansi'
import { stripIndent } from 'common-tags'
import dockerps from '../source'

test('is ok', async t => {
  const expected = stripIndent`
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

  const output = await dockerps()
  t.is(stripAnsi(output), expected)
})
