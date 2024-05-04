import Adventure, { AdventurePaginationInput } from '#app/core/preparation/adventure/adventure'
import Pagination from '#app/core/preparation/pagination'
import { AdventureRepository } from '#app/core/preparation/use-cases/get-adventures.use-case'
import AdventureModel from '#models/adventure.model'

export default class AdventureRepositoryDatabase implements AdventureRepository {
  public async getAll(input: AdventurePaginationInput): Promise<Pagination<Adventure>> {
    const pagination = await AdventureModel.query()
      .orderBy('name')
      .paginate(input.page.get(), input.limit.get())
    const adventures = pagination.all().map((model) => new Adventure(model.name))
    return new Pagination(adventures, {
      total: pagination.total,
      next: pagination.getNextPageUrl(),
      previous: pagination.getPreviousPageUrl(),
    })
  }
}
