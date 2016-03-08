import _ from 'lodash/fp'
import cli from './cli'
import { optionsToString, execute, parse } from './execute'
import output from './output'

console.log(_.pipe(optionsToString, execute, parse, output)(cli.flags))
