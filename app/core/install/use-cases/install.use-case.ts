import Adventure from '#app/core/install/adventure/adventure'
import { Events } from '#app/core/install/event/events'
import InstallerStatus from '#app/core/install/installer-status/installer-status'
import Item from '#app/core/install/item/item'
import { Items } from '#app/core/install/item/items'
import { UnitOfWork } from '#app/core/unit-of-work/unit-of-work'
import { faker } from '@faker-js/faker'
import { randomInt } from 'node:crypto'

export interface InstallerStatusRepository {
  getStatus(unitOfWork: unknown): Promise<boolean>
  update(installerStatus: InstallerStatus, unitOfWork: unknown): Promise<void>
}

export interface AdventureRepository {
  createMany(adventures: Adventure[], unitOfWork: unknown): Promise<void>
  countAll(): Promise<number>
}

export interface ItemRepository {
  createMany(items: Item[], unitOfWork: unknown): Promise<void>
}

export default class InstallUseCase {
  constructor(
    private readonly adventureRepository: AdventureRepository,
    private readonly itemRepository: ItemRepository,
    private readonly installerStatusRepository: InstallerStatusRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  async apply(): Promise<void> {
    return this.unitOfWork.begin(async (unitOfWork) => {
      const isAlreadyInstalled = await this.installerStatusRepository.getStatus(unitOfWork)
      if (isAlreadyInstalled) {
        return
      }

      await this.adventureRepository.createMany(
        [
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
        ],
        unitOfWork
      )

      await this.itemRepository.createMany(Object.values(Items), unitOfWork)

      await this.installerStatusRepository.update(new InstallerStatus(true), unitOfWork)
    })
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
