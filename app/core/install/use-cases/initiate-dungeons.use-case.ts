import ItemChallenge from '#app/core/exploration/dungeon/events/item-challenge'
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
      new Dungeon('Market', ['Shop', 'Thief']),
      ...randomItemChallengeDungeons(5),
    ])
  }
}

function randomItemChallengeDungeons(count: number) {
  return dungeonFactory(() => {
    const challenge = ItemChallenge.randomScoreMaxFrom('etaonihsrl'.repeat(5))
    return new Dungeon(challenge.toString(), [`Item Challenge:${challenge}`])
  }, count)
}

function* dungeonFactory(factory: () => Dungeon, n: number): Generator<Dungeon> {
  for (let i = 0; i < n; i++) {
    yield factory()
  }
}
