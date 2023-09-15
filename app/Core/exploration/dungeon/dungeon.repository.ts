import { DungeonRepository } from '../use-cases/explore-dungeon.use-case'
import Dungeon from './dungeon'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async getByName(name: string): Promise<Dungeon> {
    const model = await DungeonModel.findOrFail(name)
    return model.toDungeon()
  }

  public flush() {
    return DungeonModel.truncate(true)
  }
}
