import PlayerSheet from '#app/core/inscription/player-sheet/player-sheet'
import { PlayerSheetRepository } from '#app/core/inscription/use-cases/add-player.use-case'
import BackpackModel from '#models/backpack.model'
import PlayerModel from '#models/player.model'
import db from '@adonisjs/lucid/services/db'

export default class PlayerSheetRepositoryDatabase implements PlayerSheetRepository {
  public create(playerSheet: PlayerSheet) {
    return db.transaction(async (trx) => {
      await PlayerModel.firstOrCreate(
        {
          name: playerSheet.name.get(),
        },
        {
          name: playerSheet.name.get(),
          password: playerSheet.password.get(),
        },
        { client: trx }
      )
      await BackpackModel.firstOrCreate(
        {
          playerName: playerSheet.name.get(),
        },
        {
          playerName: playerSheet.name.get(),
        },
        { client: trx }
      )
    })
  }

  public async count(): Promise<number> {
    const { count } = await db.from('players').count('*').first()
    return count
  }
}
