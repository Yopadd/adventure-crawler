import Backpack from '#app/core/exploration/player/backpack/backpack'
import Item from '#app/core/exploration/player/backpack/item/item'
import Player from '#app/core/exploration/player/player'
import type { PlayerRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import BackpackModel from '#models/backpack.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'
import Logbook from '#app/core/exploration/player/logbook/logbook'
import db from '@adonisjs/lucid/services/db'

export default class PlayerRepositoryDatabase implements PlayerRepository {
  public async getByName(name: string): Promise<Player> {
    return db.transaction(async (trx) => {
      const model = await PlayerModel.findOrFail(name, { client: trx })
      await model.load('backpack')
      await model.load('logbook')
      await model.logbook.loadCount('reports')
      return PlayerRepositoryDatabase.toPlayer(model, model.logbook.$extras.reports_count)
    })
  }

  private static toPlayer(model: PlayerModel, logbookSize: number): Player {
    return new Player(PlayerRepositoryDatabase.toBackpack(model.backpack), new Logbook(logbookSize))
  }

  private static toBackpack(model: BackpackModel): Backpack {
    return new Backpack(model.items.map(PlayerRepositoryDatabase.toItem))
  }

  private static toItem(model: ItemModel): Item {
    return new Item(model.name, model.description, model.tags.split(';'))
  }
}
