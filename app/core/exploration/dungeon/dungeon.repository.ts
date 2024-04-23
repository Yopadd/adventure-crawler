import Dungeon, { DungeonName } from '#app/core/exploration/dungeon/dungeon'
import Cliff from '#app/core/exploration/dungeon/events/cliff'
import Collector from '#app/core/exploration/dungeon/events/collector'
import CrossingLavaRiver from '#app/core/exploration/dungeon/events/crossing-lava-river'
import FireCamp from '#app/core/exploration/dungeon/events/fire-camp'
import ItemChallenge from '#app/core/exploration/dungeon/events/item-challenge'
import Thief from '#app/core/exploration/dungeon/events/thief'
import TunnelInTheDark from '#app/core/exploration/dungeon/events/tunnel-in-the-dark'
import Vampire from '#app/core/exploration/dungeon/events/vampire'
import Wolfs from '#app/core/exploration/dungeon/events/wolfs'
import { DungeonRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import { EventName } from '#app/core/install/event/event'
import DungeonModel from '#models/dungeon.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { match, P } from 'ts-pattern'

export default class DungeonRepositoryDatabase implements DungeonRepository {
  public async getByName(name: string, client: TransactionClientContract) {
    const model = await DungeonModel.findOrFail(name, { client })
    return new Dungeon(
      new DungeonName(model.name),
      model.events.split(';').map(DungeonRepositoryDatabase.toDungeonEvent)
    )
  }

  private static toDungeonEvent(name: string) {
    return match<EventName>(name as EventName)
      .with('Crossing Lava River', () => new CrossingLavaRiver())
      .with('Collector', () => new Collector())
      .with('Thief', () => new Thief())
      .with(P.string.startsWith('Item Challenge'), (name) => {
        const challenge = Number.parseInt(name.split(':')[1])
        return new ItemChallenge(challenge)
      })
      .with('Cliff', () => new Cliff())
      .with('Tunnel In The Dark', () => new TunnelInTheDark())
      .with('Vampire', () => new Vampire())
      .with(P.string.startsWith('Wolfs'), (name) => {
        const wolfsCount = Number.parseInt(name.split(':')[1])
        return new Wolfs(wolfsCount)
      })
      .with('Fire Camp', () => new FireCamp())
      .exhaustive()
  }
}
