import Adventure from '#app/core/install/adventure/adventure'
import { Events } from '#app/core/install/event/events'
import { faker } from '@faker-js/faker'
import { randomInt } from 'node:crypto'

export interface AdventureRepository {
  createMany(adventures: Adventure[]): Promise<void>
  countAll(): Promise<number>
}

export default class InstallAdventuresUseCase {
  constructor(private readonly adventureRepository: AdventureRepository) {}

  public async apply() {
    await this.adventureRepository.createMany([
      new Adventure('Aazzidy', [
        Events.Collector(),
        Events.Thief(),
        Events.Wolfs(2),
        Events.FireCamp(),
        Events.CrossingLavaRiver(),
        Events.Dragon(),
      ]),
      ...adventuresRandomiser(3, 7),
      ...adventuresRandomiser(5, 7),
      ...itemChallengeAdventuresRandomiser(3),
    ])
  }
}

function itemChallengeAdventuresRandomiser(count: number) {
  return adventuresFactory(() => {
    const event = Events.ItemChallenge()
    const title = event.split(':')[1]
    return new Adventure(title, [event])
  }, count)
}

function adventuresRandomiser(eventCount: number, adventureCount: number) {
  return adventuresFactory(() => {
    const allEvents = Object.values(Events)
    let events = []
    for (let i = 0; i < eventCount; i++) {
      const [event] = allEvents.splice(randomInt(0, allEvents.length - 1), 1)
      events.push(event)
    }
    const adventureName = faker.lorem.slug(6)
    return new Adventure(
      adventureName,
      events.map((event) => event())
    )
  }, adventureCount)
}

function* adventuresFactory(factory: () => Adventure, count: number): Generator<Adventure> {
  for (let i = 0; i < count; i++) {
    yield factory()
  }
}