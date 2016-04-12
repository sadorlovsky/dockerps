import test from 'ava'
import { optionsToString } from '../src/execute'

test('empty options', (t) => {
  t.deepEqual(optionsToString({ flags: {} }), '')
})

test('-a, --all option', (t) => {
  t.deepEqual(optionsToString({a: true}), '-a')
  t.deepEqual(optionsToString({all: true}), '-a')

  t.deepEqual(optionsToString({a: false}), '')
  t.deepEqual(optionsToString({all: false}), '')

  t.deepEqual(optionsToString({a: true, all: true}), '-a')

  t.deepEqual(optionsToString({a: 'abc'}), '-a')
  t.deepEqual(optionsToString({all: 'abc'}), '-a')
})

test('-l, --lalest option', (t) => {
  t.deepEqual(optionsToString({l: true}), '-l')
  t.deepEqual(optionsToString({latest: true}), '-l')

  t.deepEqual(optionsToString({l: false}), '')
  t.deepEqual(optionsToString({latest: false}), '')

  t.deepEqual(optionsToString({l: true, latest: true}), '-l')

  t.deepEqual(optionsToString({l: 'abc'}), '-l')
  t.deepEqual(optionsToString({latest: 'abc'}), '-l')
})

test('-n, --number option', (t) => {
  t.deepEqual(optionsToString({n: true}), '')
  t.deepEqual(optionsToString({number: true}), '')

  t.deepEqual(optionsToString({n: false}), '')
  t.deepEqual(optionsToString({number: false}), '')

  t.deepEqual(optionsToString({n: 'abc'}), '')
  t.deepEqual(optionsToString({number: 'abc'}), '')

  t.deepEqual(optionsToString({n: 123}), '-n 123')
  t.deepEqual(optionsToString({number: 123}), '-n 123')

  t.deepEqual(optionsToString({n: '123'}), '')
  t.deepEqual(optionsToString({number: '123'}), '')
})

test('-f, --filter option', (t) => {
  t.deepEqual(optionsToString({f: true}), '')
  t.deepEqual(optionsToString({filter: true}), '')

  t.deepEqual(optionsToString({f: false}), '')
  t.deepEqual(optionsToString({filter: false}), '')

  t.deepEqual(optionsToString({f: 'abc'}), '-f abc')
  t.deepEqual(optionsToString({filter: 'abc'}), '-f abc')

  t.deepEqual(optionsToString({f: 123}), '')
  t.deepEqual(optionsToString({filter: 123}), '')
})
