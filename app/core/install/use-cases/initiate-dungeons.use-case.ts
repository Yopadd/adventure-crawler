import Dungeon from '#app/core/install/dungeon/dungeon'

export interface DungeonRepository {
  createMany(dungeons: Dungeon[]): Promise<void>
  countAll(): Promise<number>
}

export default class InitiateDungeonsUseCase {
  constructor(private readonly dungeonRepository: DungeonRepository) {}

  public async apply() {
    await this.dungeonRepository.createMany([
      new Dungeon('Lava-Dungeons-1', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-2', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-3', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-4', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-5', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-6', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-7', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-8', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-9', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-10', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-11', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-12', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-13', ['Crossing Lava River']),
      new Dungeon('Lava-Dungeons-14', ['Crossing Lava River']),
    ])
  }
}
