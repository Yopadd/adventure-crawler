import { PlayerCommands } from '#app/core/exploration/player/player'
import Backpack from '#app/core/preparation/backpack/backpack'
import AdventureModel from '#models/adventure.model'
import ItemModel from '#models/item.model'
import { faker } from '@faker-js/faker'
import { ApiClient, ApiResponse } from '@japa/api-client'
import { randomInt } from 'node:crypto'

export type MonkeyReport = {
  requests: string[]
}

export default class MonkeyTester {
  private readonly actions: Array<(report: MonkeyReport) => unknown>
  public error: ApiResponse | null = null
  private readonly players: Array<{ name: string; password: string }> = []

  constructor(private readonly client: ApiClient) {
    this.actions = [
      this.inscription.bind(this),
      this.getItems.bind(this),
      this.getAdventures.bind(this),
      this.addItems.bind(this),
      this.getScoreBoard.bind(this),
      this.exploration.bind(this),
      this.visit.bind(this),
    ]
  }

  public async play(requestCount: number): Promise<MonkeyReport> {
    const report: MonkeyReport = {
      requests: [],
    }
    for (let i = 0; i < requestCount; i++) {
      const actions = this.actions[randomInt(this.actions.length)]
      try {
        await actions(report)
      } catch (err) {
        this.error = err
        break
      }
    }
    return report
  }

  private async inscription(report: MonkeyReport) {
    report.requests.push('inscription')
    const payload = { name: faker.person.firstName(), password: faker.string.uuid() }
    const response = await this.client.post('/inscription').json(payload)
    this.players.push(payload)
    return response
  }

  private getItems(report: MonkeyReport) {
    report.requests.push('getItems')
    return this.client.get('/preparation/items').qs({
      limit: faker.number.int({ max: 150 }),
      page: faker.number.int({ max: 10_500 }),
    })
  }

  private getAdventures(report: MonkeyReport) {
    report.requests.push('getAdventures')
    return this.client.get('/preparation/adventures').qs({
      limit: faker.number.int({ max: 150 }),
      page: faker.number.int({ max: 10_500 }),
    })
  }

  private getScoreBoard(report: MonkeyReport) {
    report.requests.push('getScoreBoard')
    return this.client.get('/score-board').qs({
      limit: faker.number.int({ max: 150 }),
      page: faker.number.int({ max: 10_500 }),
    })
  }

  private async addItems(report: MonkeyReport) {
    report.requests.push('addItems')
    const items = await ItemModel.all()
    const itemsCount = randomInt(Backpack.size + 2)
    const itemsName = Array(itemsCount)
      .fill(undefined)
      .map(() => items[randomInt(items.length)].name)
    const { name, password } = this.getRandomPlayer()
    return this.client.post('/preparation/backpack').basicAuth(name, password).json({ itemsName })
  }

  private async exploration(report: MonkeyReport) {
    report.requests.push('exploration')
    const adventure = await this.getRandomAdventure()
    const { name, password } = this.getRandomPlayer()
    return this.client
      .post(`/exploration/adventures/${adventure.name}`)
      .basicAuth(name, password)
      .json({
        egg: faker.datatype.boolean(),
        bread: faker.datatype.boolean(),
        cheese: faker.datatype.boolean(),
        milk: faker.datatype.boolean(),
      } satisfies PlayerCommands)
  }

  private async visit(report: MonkeyReport) {
    report.requests.push('visit')
    const adventure = await this.getRandomAdventure()
    const { name, password } = this.getRandomPlayer()
    return this.client
      .get(`/exploration/adventures/${adventure.name}`)
      .basicAuth(name, password)
      .send()
  }

  private getRandomPlayer() {
    return this.players.length
      ? this.players[randomInt(this.players.length)]
      : {
          name: '',
          password: '',
        }
  }

  private async getRandomAdventure(): Promise<AdventureModel> {
    const adventures = await AdventureModel.all()
    return adventures[randomInt(adventures.length)]
  }
}
