import Dungeon from '#app/core/install/dungeon/dungeon'

export interface DungeonRepository {
  createMany(dungeons: Dungeon[]): Promise<void>
  countAll(): Promise<number>
}

export default class InitiateDungeonsUseCase {
  constructor(private readonly dungeonRepository: DungeonRepository) {}

  public async apply() {
    await this.dungeonRepository.createMany([
      new Dungeon('Volcania', ['Crossing Lava River']),
      new Dungeon('Herotopia', ['Crossing Lava River']),
    ])
  }
}
