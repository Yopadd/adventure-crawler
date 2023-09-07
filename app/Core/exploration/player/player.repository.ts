import PlayerModel from 'App/Models/Player.model'
import { PlayerRepository } from '../use-cases/explore-dungeon.use-case'
import Player from './player'

export default class PlayerRepositoryDatabase implements PlayerRepository {
  public async getByName(name: string): Promise<Player | undefined> {
    const model = await PlayerModel.find(name)
    if (model) {
      return model.toPlayer()
    }
    return undefined
  }

  public flush() {
    return PlayerModel.truncate(true)
  }
}
