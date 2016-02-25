import test from 'ava'
import lib from '../lib/index'

test('empty', (t) => {
  t.same(lib.generateOptions({ flags: {} }), '')
})

test('-a, --all option', (t) => {
  t.same(lib.generateOptions({ flags: {a: true} }), '-a')
  t.same(lib.generateOptions({ flags: {all: true} }), '-a')

  t.same(lib.generateOptions({ flags: {a: false} }), '')
  t.same(lib.generateOptions({ flags: {all: false} }), '')

  t.same(lib.generateOptions({ flags: {a: true, all: true} }), '-a')

  t.same(lib.generateOptions({ flags: {a: 'abc'} }), '-a')
  t.same(lib.generateOptions({ flags: {all: 'abc'} }), '-a')
})

test('-l, --lalest option', (t) => {
  t.same(lib.generateOptions({ flags: {l: true} }), '-l')
  t.same(lib.generateOptions({ flags: {latest: true} }), '-l')

  t.same(lib.generateOptions({ flags: {l: false} }), '')
  t.same(lib.generateOptions({ flags: {latest: false} }), '')

  t.same(lib.generateOptions({ flags: {l: true, latest: true} }), '-l')

  t.same(lib.generateOptions({ flags: {l: 'abc'} }), '-l')
  t.same(lib.generateOptions({ flags: {latest: 'abc'} }), '-l')
})

test('-n, --number option', (t) => {
  t.same(lib.generateOptions({ flags: {n: true} }), '')
  t.same(lib.generateOptions({ flags: {number: true} }), '')

  t.same(lib.generateOptions({ flags: {n: false} }), '')
  t.same(lib.generateOptions({ flags: {number: false} }), '')

  t.same(lib.generateOptions({ flags: {n: 'abc'} }), '')
  t.same(lib.generateOptions({ flags: {number: 'abc'} }), '')

  t.same(lib.generateOptions({ flags: {n: 123} }), '-n 123')
  t.same(lib.generateOptions({ flags: {number: 123} }), '-n 123')

  t.same(lib.generateOptions({ flags: {n: '123'} }), '')
  t.same(lib.generateOptions({ flags: {number: '123'} }), '')
})

test('-f, --filter option', (t) => {
  t.same(lib.generateOptions({ flags: {f: true} }), '')
  t.same(lib.generateOptions({ flags: {filter: true} }), '')

  t.same(lib.generateOptions({ flags: {f: false} }), '')
  t.same(lib.generateOptions({ flags: {filter: false} }), '')

  t.same(lib.generateOptions({ flags: {f: 'abc'} }), '-f abc')
  t.same(lib.generateOptions({ flags: {filter: 'abc'} }), '-f abc')

  t.same(lib.generateOptions({ flags: {f: 123} }), '')
  t.same(lib.generateOptions({ flags: {filter: 123} }), '')
})
