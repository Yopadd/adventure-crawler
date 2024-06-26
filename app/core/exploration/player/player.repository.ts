import AdventureRepositoryDatabase from '#app/core/exploration/adventure/adventure.repository'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Item from '#app/core/exploration/player/backpack/item/item'
import Player from '#app/core/exploration/player/player'
import type { PlayerRepository } from '#app/core/exploration/use-cases/explore-adventure.use-case'
import { Tag } from '#app/core/install/tag/tag'
import BackpackModel from '#models/backpack.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { DateTime } from 'luxon'

export default class PlayerRepositoryDatabase implements PlayerRepository {
  public async getByName(name: string, client: TransactionClientContract): Promise<Player> {
    const model = await PlayerModel.query({ client })
      .preload('backpack', (backpackQuery) => {
        backpackQuery.preload('items')
      })
      .preload('adventuresVisited')
      .where('name', name)
      .firstOrFail()
    return PlayerRepositoryDatabase.toPlayer(model)
  }

  public async save(player: Player, client: TransactionClientContract): Promise<void> {
    const model = await PlayerModel.query({ client })
      .preload('backpack', (backpackQuery) => {
        backpackQuery.preload('items')
      })
      .preload('adventuresVisited')
      .where('name', player.name.get())
      .firstOrFail()

    const itemsName = player.backpack.items.map((item) => item.name.get())
    await model.backpack.related('items').sync(itemsName)

    const adventures = player.adventuresVisited.reduce<Record<string, { visited_at: DateTime }>>(
      (acc, { adventure, visitedAt }) => {
        acc[adventure.name.get()] = {
          visited_at: visitedAt,
        }
        return acc
      },
      {}
    )

    await model.related('adventuresVisited').sync(adventures, false)
  }

  private static toPlayer(model: PlayerModel): Player {
    const adventuresVisited = new Map(
      model.adventuresVisited.map((item) => [
        item.name,
        {
          adventure: AdventureRepositoryDatabase.toAdventure(item),
          visitedAt: DateTime.fromJSDate(item.$extras.pivot_visited_at),
        },
      ])
    )
    return new Player(
      model.name,
      PlayerRepositoryDatabase.toBackpack(model.backpack),
      adventuresVisited
    )
  }

  private static toBackpack(model: BackpackModel): Backpack {
    return new Backpack(model.items.map(PlayerRepositoryDatabase.toItem))
  }

  private static toItem(model: ItemModel): Item {
    return new Item(model.name, model.description, model.tags.split(';') as Tag[])
  }
}
