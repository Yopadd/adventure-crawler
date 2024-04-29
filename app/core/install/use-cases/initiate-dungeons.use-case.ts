import ItemChallenge from '#app/core/exploration/dungeon/events/item-challenge'
import Dungeon from '#app/core/install/dungeon/dungeon'
import { EventName } from '#app/core/install/event/event'
import { createHash, randomInt } from 'node:crypto'

export interface DungeonRepository {
  createMany(dungeons: Dungeon[]): Promise<void>
  countAll(): Promise<number>
}

export default class InitiateDungeonsUseCase {
  constructor(private readonly dungeonRepository: DungeonRepository) {}

  public async apply() {
    await this.dungeonRepository.createMany([
      new Dungeon('Tezzidy', [
        'Thief',
        'Collector',
        'Wolfs:2',
        'Fire Camp',
        'Crossing Lava River',
        'Dragon',
      ]),
      ...randomItemChallengeDungeons(5),
      ...randomThreeEventsDungeons(5),
    ])
  }
}

function randomItemChallengeDungeons(count: number) {
  return dungeonFactory(() => {
    const challenge = ItemChallenge.randomScoreMaxFrom('etaonihsrl'.repeat(5))
    return new Dungeon(challenge.toString(), [`Item Challenge:${challenge}`])
  }, count)
}

function randomThreeEventsDungeons(count: number) {
  return dungeonFactory(() => {
    const events: EventName[] = [
      'Cliff',
      'Collector',
      'Crossing Lava River',
      'Thief',
      'Tunnel In The Dark',
      'Vampire',
      'Fire Camp',
      `Wolfs:${randomInt(1, 3)}`,
    ]
    const [event1] = events.splice(randomInt(0, events.length - 1), 1)
    const [event2] = events.splice(randomInt(0, events.length - 1), 1)
    const [event3] = events.splice(randomInt(0, events.length - 1), 1)
    const dungeonName = createHash('md5')
      .update(event1 + event2 + event3 + Math.random())
      .digest('base64')
      .substring(0, 15)
      .replaceAll(/[0-9]/g, '-')
      .replaceAll('--', '-')
      .replaceAll('+', '-Darkness-')
      .replaceAll('/', '-Dead-')
      .replaceAll('--', '-')
    return new Dungeon(dungeonName, [event1, event2, event3])
  }, count)
}

function* dungeonFactory(factory: () => Dungeon, count: number): Generator<Dungeon> {
  for (let i = 0; i < count; i++) {
    yield factory()
  }
}
