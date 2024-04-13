import Dungeon, { DungeonName } from '#app/core/exploration/dungeon/dungeon'
import CrossingLavaRiver from '#app/core/exploration/dungeon/events/crossing-lava-river'
import Shop from '#app/core/exploration/dungeon/events/shop'
import Thief from '#app/core/exploration/dungeon/events/thief'
import { DungeonRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import { EventName } from '#app/core/install/event/event'
import DungeonModel from '#models/dungeon.model'
import { match } from 'ts-pattern'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async getByName(name: string) {
    const model = await DungeonModel.findOrFail(name)
    return new Dungeon(
      new DungeonName(model.name),
      model.events.split(';').map(DungeonRepositoryDatabase.toDungeonEvent)
    )
  }

  private static toDungeonEvent(name: string) {
    return match<EventName>(name as EventName)
      .with('Crossing Lava River', () => new CrossingLavaRiver())
      .with('Shop', () => new Shop())
      .with('Thief', () => new Thief())
      .exhaustive()
  }
}
