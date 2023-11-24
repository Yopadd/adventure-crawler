import PlayerModel from 'App/Models/Player.model'
import { PlayerSheetRepository } from '../use-cases/add-player.use-case'
import PlayerSheet from './player-sheet'

export default class PlayerSheetRepositoryDatabase implements PlayerSheetRepository {
  public async create(playerSheet: PlayerSheet) {
    await PlayerModel.create({
      name: playerSheet.name.get(),
      password: playerSheet.password.get(),
    })
  }
}
