import faker from 'faker'
import moment from 'moment'

export default function randomStdout () {
  const stdout = []

  for (let i = 0; i < (Math.random() * 100); i++) {
    const id = Math.random().toString(36).substring(6)
    const name = faker.helpers.slugify(`${faker.hacker.adjective()} ${faker.hacker.noun()}`)
    const image = faker.helpers.slugify(faker.hacker.noun())
    const command = 'npm start'
    const createdAt = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss ZZ')
    const runningFor = moment(faker.date.past()).fromNow(true)
    const status = () => {
      const _status = faker.helpers.randomize(['Up', 'Exited'])
      const days = faker.random.number()
      if (_status === 'Exited') {
        return `${_status} (0) ${days} days ago`
      }
      return `${_status} ${days} days`
    }
    const ports = () => {
      return faker.helpers.randomize([
        '0.0.0.0:1194->1194/udp',
        '0.0.0.0:8080->8080/tcp',
        '1194/udp',
        '8080/tcp',
        ''
      ])
    }

    stdout.push(`${id}\t${name}\t${image}\t\"${command}\"\t${createdAt}\t${runningFor}\t${status()}\t${ports()}`)
  }

  return stdout.join('\n')
}
