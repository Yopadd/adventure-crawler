import Dungeon, { DungeonEventName } from '../dungeon/dungeon.js'

export interface DungeonRepository {
  createMany(dungeons: Dungeon[]): Promise<void>
  countAll(): Promise<number>
}

export default class InitiateDungeonsUseCase {
  constructor(private readonly dungeonRepository: DungeonRepository) {}

  public async apply() {
    await this.dungeonRepository.createMany([
      new Dungeon('Lava Dungeons 1', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 2', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 3', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 4', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 5', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 6', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 7', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 8', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 9', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 10', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 11', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 12', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 13', [DungeonEventName.LAVA]),
      new Dungeon('Lava Dungeons 14', [DungeonEventName.LAVA]),
    ])
  }
}
