import Adventure from '#app/core/exploration/adventure/adventure'
import Castel from '#app/core/exploration/adventure/events/castel'
import Cliff from '#app/core/exploration/adventure/events/cliff'
import Collector from '#app/core/exploration/adventure/events/collector'
import CrossingLavaRiver from '#app/core/exploration/adventure/events/crossing-lava-river'
import Crypt from '#app/core/exploration/adventure/events/crypt'
import Demons from '#app/core/exploration/adventure/events/demons'
import Dragon from '#app/core/exploration/adventure/events/dragon'
import Farm from '#app/core/exploration/adventure/events/farm'
import FireCamp from '#app/core/exploration/adventure/events/fire-camp'
import ForestHiking from '#app/core/exploration/adventure/events/forest-hiking'
import GoldOffering from '#app/core/exploration/adventure/events/gold-offering'
import ItemChallenge from '#app/core/exploration/adventure/events/item-challenge'
import MountainHiking from '#app/core/exploration/adventure/events/mountain-hiking'
import SacrificeRoom from '#app/core/exploration/adventure/events/sacrifice-room'
import Thief from '#app/core/exploration/adventure/events/thief'
import TunnelInTheDark from '#app/core/exploration/adventure/events/tunnel-in-the-dark'
import Vampire from '#app/core/exploration/adventure/events/vampire'
import Wolfs from '#app/core/exploration/adventure/events/wolfs'
import { AdventureRepository } from '#app/core/exploration/use-cases/explore-adventure.use-case'
import { EventName } from '#app/core/install/event/events'
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
    return match(name as EventName)
      .with('Castel', () => new Castel())
      .with('Cliff', () => new Cliff())
      .with('Collector', () => new Collector())
      .with('Crossing Lava River', () => new CrossingLavaRiver())
      .with('Crypt', () => new Crypt())
      .with('Demons', () => new Demons())
      .with('Dragon', () => new Dragon())
      .with('Farm', () => new Farm())
      .with('Fire Camp', () => new FireCamp())
      .with('Forest Hiking', () => new ForestHiking())
      .with('Gold Offering', () => new GoldOffering())
      .with('Mountain Hiking', () => new MountainHiking())
      .with('Sacrifice Room', () => new SacrificeRoom())
      .with('Thief', () => new Thief())
      .with('Tunnel In The Dark', () => new TunnelInTheDark())
      .with('Vampire', () => new Vampire())
      .with(P.string.startsWith('Item Challenge'), (name) => {
        const challenge = Number.parseInt(name.split(':')[1])
        return new ItemChallenge(challenge)
      })
      .with(P.string.startsWith('Wolfs'), (name) => {
        const wolfsCount = Number.parseInt(name.split(':')[1])
        return new Wolfs(wolfsCount)
      })
      .exhaustive()
  }
}
