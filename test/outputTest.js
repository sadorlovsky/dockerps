import test from 'ava'
import chalk from 'chalk'
import outputConsole, { noContainersMessage, createTable, column } from '../src/output'

test('table', (t) => {
  t.truthy(createTable())
})

test('column', (t) => {
  t.deepEqual(
    column({ 'Name': 'Mongo', 'Image': 'Mongodb', 'Command': 'sh' }),
    `${chalk.magenta('Name')}\nMongo\n${chalk.magenta('Image')}\nMongodb\n${chalk.magenta('Command')}\nsh`
  )
})

test('no containers message', (t) => {
  const expected = `${chalk.magenta('There are no running containers.')}\nUse ${chalk.blue('-a, --all')} option to show all containers.`
  t.deepEqual(noContainersMessage(), expected)
})

test('print message if no containers', (t) => {
  const expected = `${chalk.magenta('There are no running containers.')}\nUse ${chalk.blue('-a, --all')} option to show all containers.`
  t.deepEqual(outputConsole([]), expected)
})
