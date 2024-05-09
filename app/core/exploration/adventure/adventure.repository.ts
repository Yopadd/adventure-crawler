import Adventure from '#app/core/exploration/adventure/adventure'
import Cliff from '#app/core/exploration/adventure/events/cliff'
import Collector from '#app/core/exploration/adventure/events/collector'
import CrossingLavaRiver from '#app/core/exploration/adventure/events/crossing-lava-river'
import Crypt from '#app/core/exploration/adventure/events/crypt'
import Dragon from '#app/core/exploration/adventure/events/dragon'
import FireCamp from '#app/core/exploration/adventure/events/fire-camp'
import ItemChallenge from '#app/core/exploration/adventure/events/item-challenge'
import Thief from '#app/core/exploration/adventure/events/thief'
import TunnelInTheDark from '#app/core/exploration/adventure/events/tunnel-in-the-dark'
import Vampire from '#app/core/exploration/adventure/events/vampire'
import Wolfs from '#app/core/exploration/adventure/events/wolfs'
import { AdventureRepository } from '#app/core/exploration/use-cases/explore-adventure.use-case'
import { EventName } from '#app/core/install/event/event'
import AdventureModel from '#models/adventure.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { match, P } from 'ts-pattern'

export default class AdventureRepositoryDatabase implements AdventureRepository {
  public async getByName(name: string, client: TransactionClientContract) {
    const model = await AdventureModel.findOrFail(name, { client })
    return new Adventure(
      model.name,
      model.events.split(';').map(AdventureRepositoryDatabase.toAdventureEvent)
    )
  }

  private static toAdventureEvent(name: string) {
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
      .with('Dragon', () => new Dragon())
      .with('Crypt', () => new Crypt())
      .exhaustive()
  }
}
