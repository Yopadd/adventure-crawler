import Dungeon from '#app/core/install/dungeon/dungeon'
import { DungeonRepository } from '#app/core/install/use-cases/initiate-dungeons.use-case'
import DungeonModel from '#models/dungeon.model'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async createMany(dungeons: Dungeon[]): Promise<void> {
    await DungeonModel.createMany(
      dungeons.map((dungeon) => ({
        name: dungeon.name.get(),
        events: dungeon.events.join(';'),
      }))
    )
  }

  public async countAll(): Promise<number> {
    const result = await DungeonModel.query().count('*', 'total').exec()
    return result.length
  }
}
