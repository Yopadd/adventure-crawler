import Dungeon, { DungeonName, DungeonPaginationInput } from '#app/core/preparation/dungeon/dungeon'
import { DungeonRepository } from '#app/core/preparation/use-cases/get-dungeons.use-case'
import DungeonModel from '#models/dungeon.model'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async getAll(input: DungeonPaginationInput): Promise<Dungeon[]> {
    const pagination = await DungeonModel.query().paginate(input.page.get(), input.limit.get())
    return pagination.all().map((model) => new Dungeon(new DungeonName(model.name)))
  }
}
