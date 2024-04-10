import PlayerSheet from '#app/core/inscription/player-sheet/player-sheet'
import { PlayerSheetRepository } from '#app/core/inscription/use-cases/add-player.use-case'
import BackpackModel from '#models/backpack.model'
import PlayerModel from '#models/player.model'
import db from '@adonisjs/lucid/services/db'

export default class PlayerSheetRepositoryDatabase implements PlayerSheetRepository {
  public create(playerSheet: PlayerSheet) {
    return db.transaction(async (trx) => {
      await PlayerModel.create(
        {
          name: playerSheet.name.get(),
          password: playerSheet.password.get(),
        },
        { client: trx }
      )
      await BackpackModel.create(
        {
          playerName: playerSheet.name.get(),
        },
        { client: trx }
      )
    })
  }
}
