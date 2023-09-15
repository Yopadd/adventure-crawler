import BackpackModel from 'App/Models/Inventory.model'
import ItemModel from 'App/Models/Item.model'
import LogbookModel from 'App/Models/Logbook.model'
import PlayerModel from 'App/Models/Player.model'
import { PlayerRepository } from '../use-cases/explore-dungeon.use-case'
import Backpack from './backpack/backpack'
import Item from './backpack/item/item'
import Logbook from './logbook/logbook'
import Player from './player'

export default class PlayerRepositoryDatabase implements PlayerRepository {
  public async getByName(name: string): Promise<Player> {
    const model = await PlayerModel.findOrFail(name)
    return PlayerRepositoryDatabase.toPlayer(model)
  }

  public flush() {
    return PlayerModel.truncate(true)
  }

  private static toPlayer(model: PlayerModel): Player {
    return new Player(
      PlayerRepositoryDatabase.toBackpack(model.backpack),
      PlayerRepositoryDatabase.toLogbook(model.logbook)
    )
  }

  private static toBackpack(model: BackpackModel): Backpack {
    return new Backpack(model.items.map(PlayerRepositoryDatabase.toItem))
  }

  private static toLogbook(model: LogbookModel): Logbook {
    return new Logbook()
  }

  private static toItem(model: ItemModel): Item {
    return new Item()
  }
}
