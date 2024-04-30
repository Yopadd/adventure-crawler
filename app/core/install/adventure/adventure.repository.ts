import Adventure from '#app/core/install/adventure/adventure'
import { AdventureRepository } from '#app/core/install/use-cases/install-adventures.use-case'
import AdventureModel from '#models/adventure.model'

export default class AdventureRepositoryDatabase implements AdventureRepository {
  public async createMany(adventures: Adventure[]): Promise<void> {
    await AdventureModel.createMany(
      adventures.map((adventure) => ({
        name: adventure.name.get(),
        events: adventure.events.join(';'),
      }))
    )
  }

  public async countAll(): Promise<number> {
    const result = await AdventureModel.query().count('*', 'total').exec()
    return result.length
  }
}
