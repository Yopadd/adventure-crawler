import Adventure from '#app/core/install/adventure/adventure'
import { EventName, Events } from '#app/core/install/event/events'
import { faker } from '@faker-js/faker'
import { randomInt } from 'node:crypto'

const builders: Array<[Adventure, (_: string[]) => EventName[]]> = [
  [
    new Adventure('Aazzidy'),
    () => [
      Events.Collector(),
      Events.Thief(),
      Events.Wolfs(undefined, 2),
      Events.FireCamp(),
      Events.CrossingLavaRiver(),
      Events.Dragon(),
    ],
  ],
  ...adventuresRandomiser(3, 6),
  ...adventuresRandomiser(4, 12),
  ...adventuresRandomiser(5, 24),
  ...adventuresRandomiser(6, 12),
  ...adventuresRandomiser(7, 6),
  ...itemChallengeAdventuresRandomiser(6),
  [new Adventure('Aztec'), () => [Events.GoldOffering()]],
  [
    new Adventure('666'),
    () => [
      Events.MountainHiking(),
      Events.CrossingLavaRiver(),
      Events.Demons(),
      Events.SacrificeRoom(),
    ],
  ],
]

export const Adventures = builders.map(([adventure, eventsFactory], _, arr) => {
  const names = arr.map(([adventure]) => adventure.name.get())
  return adventure.setEvents(eventsFactory(names))
})

function itemChallengeAdventuresRandomiser(count: number) {
  return adventuresFactory(() => {
    const event = Events.ItemChallenge()
    const title = event.split(':')[1]
    return [new Adventure(title), () => [event]]
  }, count)
}

function adventuresRandomiser(eventCount: number, adventureCount: number) {
  return adventuresFactory(() => {
    const allEventNames = Object.keys(Events) as (keyof typeof Events)[]
    let events: (keyof typeof Events)[] = []
    for (let i = 0; i < eventCount; i++) {
      const [event] = allEventNames.splice(randomInt(allEventNames.length), 1)
      events.push(event)
    }
    const adventureName = faker.lorem.slug(6)
    return [
      new Adventure(adventureName),
      (adventureNames: string[]) => events.map((event) => Events[event](adventureNames)),
    ]
  }, adventureCount)
}

function* adventuresFactory(
  factory: () => [Adventure, (_: string[]) => EventName[]],
  count: number
): Generator<[Adventure, (_: string[]) => EventName[]]> {
  for (let i = 0; i < count; i++) {
    yield factory()
  }
}
