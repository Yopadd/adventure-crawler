import Adventure, {
  AdventureName,
  AdventurePaginationInput,
} from '#app/core/preparation/adventure/adventure'
import { AdventureRepository } from '#app/core/preparation/use-cases/get-adventures.use-case'
import AdventureModel from '#models/adventure.model'

export default class AdventureRepositoryDatabase implements AdventureRepository {
  public async getAll(input: AdventurePaginationInput): Promise<Adventure[]> {
    const pagination = await AdventureModel.query().paginate(input.page.get(), input.limit.get())
    return pagination.all().map((model) => new Adventure(new AdventureName(model.name)))
  }
}
