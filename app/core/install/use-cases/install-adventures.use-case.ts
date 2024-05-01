import ItemChallenge from '#app/core/exploration/adventure/events/item-challenge'
import Adventure from '#app/core/install/adventure/adventure'
import { EventName } from '#app/core/install/event/event'
import { createHash, randomInt } from 'node:crypto'

export interface AdventureRepository {
  createMany(adventures: Adventure[]): Promise<void>
  countAll(): Promise<number>
}

export default class InstallAdventuresUseCase {
  constructor(private readonly adventureRepository: AdventureRepository) {}

  public async apply() {
    await this.adventureRepository.createMany([
      new Adventure('Tezzidy', [
        'Collector',
        'Thief',
        'Wolfs:2',
        'Fire Camp',
        'Crossing Lava River',
        'Dragon',
      ]),
      ...randomItemChallengeAdventures(5),
      ...randomThreeEventsAdventures(5),
    ])
  }
}

function randomItemChallengeAdventures(count: number) {
  return adventureFactory(() => {
    const challenge = ItemChallenge.randomScoreMaxFrom('etaonihsrl'.repeat(5))
    return new Adventure(challenge.toString(), [`Item Challenge:${challenge}`])
  }, count)
}

function randomThreeEventsAdventures(count: number) {
  return adventureFactory(() => {
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
    const adventureName = createHash('md5')
      .update(event1 + event2 + event3 + Math.random())
      .digest('base64')
      .substring(0, 15)
      .replaceAll(/[0-9]/g, '-')
      .replaceAll('--', '-')
      .replaceAll('+', '-Darkness-')
      .replaceAll('/', '-Dead-')
      .replaceAll('--', '-')
    return new Adventure(adventureName, [event1, event2, event3])
  }, count)
}

function* adventureFactory(factory: () => Adventure, count: number): Generator<Adventure> {
  for (let i = 0; i < count; i++) {
    yield factory()
  }
}
