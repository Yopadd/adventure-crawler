import GetPageInput from '../../pages/get-page-input'
import Dungeon from './dungeon'
import { DungeonServiceDungeonRepository } from './dungeon.service'

export default class DungeonRepository implements DungeonServiceDungeonRepository {
  private dungeons: Map<string, Dungeon> = new Map()

  public async findAll(input: GetPageInput): Promise<Dungeon[]> {
    return input.getPage(this.dungeons.values())
  }

  public async countAll(): Promise<number> {
    return this.dungeons.size
  }

  public async find(id: string): Promise<Dungeon | undefined> {
    return this.dungeons.get(id)
  }

  public async save(dungeon: Dungeon): Promise<Dungeon> {
    this.dungeons.set(dungeon.id, dungeon)
    return dungeon
  }

  public flush() {
    this.dungeons.clear()
  }
}
