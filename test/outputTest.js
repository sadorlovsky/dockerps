import test from 'ava'
import chalk from 'chalk'
import 'babel-register'
import { createTable, column } from '../src/output'

test('table', (t) => {
  t.ok(createTable())
})

test('column', (t) => {
  t.same(
    column({ 'Name': 'Mongo', 'Image': 'Mongodb', 'Command': 'sh' }),
    `${chalk.magenta('Name')}\nMongo\n${chalk.magenta('Image')}\nMongodb\n${chalk.magenta('Command')}\nsh`
  )
})
