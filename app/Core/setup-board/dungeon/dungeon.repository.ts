import DungeonModel from 'App/Models/Dungeon.model'
import { DungeonRepository } from '../use-cases/initiate-dungeons.use-case'
import Dungeon from './dungeon'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async create(dungeon: Dungeon): Promise<void> {
    await DungeonModel.create({
      name: dungeon.name.get(),
      events: dungeon.events.join(';'),
    })
  }

  public async countAll(): Promise<number> {
    const result = await DungeonModel.query().count('*', 'total').exec()
    return result.length
  }
}
