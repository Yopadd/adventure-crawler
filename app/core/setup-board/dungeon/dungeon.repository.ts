import Dungeon from '#app/core/setup-board/dungeon/dungeon'
import { DungeonRepository } from '#app/core/setup-board/use-cases/initiate-dungeons.use-case'
import DungeonModel from '#models/dungeon.model'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async create(dungeon: Dungeon): Promise<void> {
    await DungeonModel.create({
      name: dungeon.name.get(),
      // TODO : https://docs.adonisjs.com/reference/orm/decorators#column use serialize and consume
      events: dungeon.events.join(';'),
    })
  }

  public async countAll(): Promise<number> {
    const result = await DungeonModel.query().count('*', 'total').exec()
    return result.length
  }
}
