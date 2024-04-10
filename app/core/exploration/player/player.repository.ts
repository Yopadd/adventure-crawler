import Backpack from '#app/core/exploration/player/backpack/backpack'
import Item from '#app/core/exploration/player/backpack/item/item'
import Player from '#app/core/exploration/player/player'
import type { PlayerRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import BackpackModel from '#models/backpack.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'

export default class PlayerRepositoryDatabase implements PlayerRepository {
  public async getByName(name: string): Promise<Player> {
    const model = await PlayerModel.query()
      .preload('backpack', (backpackQuery) => {
        backpackQuery.preload('items')
      })
      .where('name', name)
      .firstOrFail()
    return PlayerRepositoryDatabase.toPlayer(model)
  }

  private static toPlayer(model: PlayerModel): Player {
    return new Player(model.name, PlayerRepositoryDatabase.toBackpack(model.backpack))
  }

  private static toBackpack(model: BackpackModel): Backpack {
    return new Backpack(model.items.map(PlayerRepositoryDatabase.toItem))
  }

  private static toItem(model: ItemModel): Item {
    return new Item(model.name, model.description, model.tags.split(';'))
  }
}
