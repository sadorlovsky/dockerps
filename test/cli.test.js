import test from 'ava'
import cli from '../src/cli'

test.only('cli', t => {
  console.log(cli())
  t.pass()
})
