import Adventure, {
  AdventurePageLimit,
  AdventurePageNumber,
  AdventurePaginationInput,
} from '#app/core/preparation/adventure/adventure'
import Pagination from '#app/core/preparation/pagination'

interface GetAdventuresUseCaseInput {
  limit: number
  page: number
}

export interface AdventureRepository {
  getAll(input: AdventurePaginationInput): Promise<Pagination<Adventure>>
}

export default class GetAdventuresUseCase {
  constructor(private readonly adventureRepository: AdventureRepository) {}

  public async apply(input: GetAdventuresUseCaseInput): Promise<Pagination<Adventure>> {
    const limit = new AdventurePageLimit(input.limit)
    const page = new AdventurePageNumber(input.page)
    return this.adventureRepository.getAll({ page, limit })
  }
}
