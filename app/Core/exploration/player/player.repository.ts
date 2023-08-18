import PlayerModel from 'App/Models/Player.model'
import GetPageInput from '../../pages/get-page-input'
import Player from './player'
import { PlayerServicePlayerRepository } from './player.service'

export default class PlayerRepository implements PlayerServicePlayerRepository {
  public async findAll(input: GetPageInput): Promise<Player[]> {
    const models = await PlayerModel.query()
      .preload('inventory', (inventory) => inventory.preload('items'))
      .forPage(input.page.get(), input.limit.get())

    return models.map((model) => model.toPlayer())
  }

  public async findByName(name: string): Promise<Player | undefined> {
    const model = await PlayerModel.findBy('name', name)
    if (model) {
      await model.load('inventory', (inventory) => inventory.preload('items'))
      return model.toPlayer()
    }
  }

  public async countAll(): Promise<number> {
    const { length } = await PlayerModel.query().count('*')
    return length
  }

  public async save(player: Player, password: string): Promise<Player> {
    await PlayerModel.create({
      id: player.id,
      name: player.name.get(),
      password: password,
    })
    return player
  }

  public flush() {
    return PlayerModel.truncate(true)
  }
}
