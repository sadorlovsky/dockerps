import test from 'ava'
import { generateOptions } from '../src/index'

test('empty', (t) => {
  t.same(generateOptions({ flags: {} }), '')
})

test('-a, --all option', (t) => {
  t.same(generateOptions({ flags: {a: true} }), '-a')
  t.same(generateOptions({ flags: {all: true} }), '-a')

  t.same(generateOptions({ flags: {a: false} }), '')
  t.same(generateOptions({ flags: {all: false} }), '')

  t.same(generateOptions({ flags: {a: true, all: true} }), '-a')

  t.same(generateOptions({ flags: {a: 'abc'} }), '-a')
  t.same(generateOptions({ flags: {all: 'abc'} }), '-a')
})

test('-l, --lalest option', (t) => {
  t.same(generateOptions({ flags: {l: true} }), '-l')
  t.same(generateOptions({ flags: {latest: true} }), '-l')

  t.same(generateOptions({ flags: {l: false} }), '')
  t.same(generateOptions({ flags: {latest: false} }), '')

  t.same(generateOptions({ flags: {l: true, latest: true} }), '-l')

  t.same(generateOptions({ flags: {l: 'abc'} }), '-l')
  t.same(generateOptions({ flags: {latest: 'abc'} }), '-l')
})

test('-n, --number option', (t) => {
  t.same(generateOptions({ flags: {n: true} }), '')
  t.same(generateOptions({ flags: {number: true} }), '')

  t.same(generateOptions({ flags: {n: false} }), '')
  t.same(generateOptions({ flags: {number: false} }), '')

  t.same(generateOptions({ flags: {n: 'abc'} }), '')
  t.same(generateOptions({ flags: {number: 'abc'} }), '')

  t.same(generateOptions({ flags: {n: 123} }), '-n 123')
  t.same(generateOptions({ flags: {number: 123} }), '-n 123')

  t.same(generateOptions({ flags: {n: '123'} }), '')
  t.same(generateOptions({ flags: {number: '123'} }), '')
})

test('-f, --filter option', (t) => {
  t.same(generateOptions({ flags: {f: true} }), '')
  t.same(generateOptions({ flags: {filter: true} }), '')

  t.same(generateOptions({ flags: {f: false} }), '')
  t.same(generateOptions({ flags: {filter: false} }), '')

  t.same(generateOptions({ flags: {f: 'abc'} }), '-f abc')
  t.same(generateOptions({ flags: {filter: 'abc'} }), '-f abc')

  t.same(generateOptions({ flags: {f: 123} }), '')
  t.same(generateOptions({ flags: {filter: 123} }), '')
})
