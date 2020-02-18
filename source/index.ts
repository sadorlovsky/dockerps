import got from 'got'
import { DateTime } from 'luxon'
import Table, { HorizontalTable } from 'cli-table3'

const shortId = (id: string) => id.substr(0, 8)
const getName = (names: string[]) => names[0].substr(1)
const getState = (state: string) => `${state.charAt(0).toUpperCase()}${state.slice(1)}`
const getCreatedDate = (created: number) => DateTime.fromJSDate(new Date(created * 1000)).toHTTP()
const getPorts = (ports: ContainerPort[]) => `${ports[0].IP}: ${ports[0].PublicPort}: ${ports[0].PrivatePort}/${ports[0].Type}`

type Container = {
  Id: string
  Names: string[]
  State: string
  Status: string
  Created: number
  Ports: ContainerPort[]
  Image: any
}

type ContainerPort = {
  IP: string
  PublicPort: string
  PrivatePort: string
  Type: string
}

const dockerps = async (): Promise<string> => {
  const containers = await got<Container[]>('unix:/var/run/docker.sock:/containers/json', {
    responseType: 'json',
    resolveBodyOnly: true
  })

  const table = new Table({
    head: ['ID', 'Name', 'Image', 'Info']
  }) as HorizontalTable

  containers.forEach(container => {
    table.push([
      shortId(container.Id),
      getName(container.Names),
      '',
      `${getState(container.State)}\n${container.Status}\nCreated ${getCreatedDate(container.Created)}\nPorts: ${getPorts(container.Ports)}`
    ])
  })

  return table.toString()
}

export default dockerps
