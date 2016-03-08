import test from 'ava'
import 'babel-register'
import { optionsToString } from '../src/execute'

test('empty options', (t) => {
  t.same(optionsToString({ flags: {} }), '')
})

test('-a, --all option', (t) => {
  t.same(optionsToString({a: true}), '-a')
  t.same(optionsToString({all: true}), '-a')

  t.same(optionsToString({a: false}), '')
  t.same(optionsToString({all: false}), '')

  t.same(optionsToString({a: true, all: true}), '-a')

  t.same(optionsToString({a: 'abc'}), '-a')
  t.same(optionsToString({all: 'abc'}), '-a')
})

test('-l, --lalest option', (t) => {
  t.same(optionsToString({l: true}), '-l')
  t.same(optionsToString({latest: true}), '-l')

  t.same(optionsToString({l: false}), '')
  t.same(optionsToString({latest: false}), '')

  t.same(optionsToString({l: true, latest: true}), '-l')

  t.same(optionsToString({l: 'abc'}), '-l')
  t.same(optionsToString({latest: 'abc'}), '-l')
})

test('-n, --number option', (t) => {
  t.same(optionsToString({n: true}), '')
  t.same(optionsToString({number: true}), '')

  t.same(optionsToString({n: false}), '')
  t.same(optionsToString({number: false}), '')

  t.same(optionsToString({n: 'abc'}), '')
  t.same(optionsToString({number: 'abc'}), '')

  t.same(optionsToString({n: 123}), '-n 123')
  t.same(optionsToString({number: 123}), '-n 123')

  t.same(optionsToString({n: '123'}), '')
  t.same(optionsToString({number: '123'}), '')
})

test('-f, --filter option', (t) => {
  t.same(optionsToString({f: true}), '')
  t.same(optionsToString({filter: true}), '')

  t.same(optionsToString({f: false}), '')
  t.same(optionsToString({filter: false}), '')

  t.same(optionsToString({f: 'abc'}), '-f abc')
  t.same(optionsToString({filter: 'abc'}), '-f abc')

  t.same(optionsToString({f: 123}), '')
  t.same(optionsToString({filter: 123}), '')
})
