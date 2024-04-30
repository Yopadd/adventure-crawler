import Adventure, {
  AdventurePageLimit,
  AdventurePageNumber,
  AdventurePaginationInput,
} from '#app/core/preparation/adventure/adventure'

interface GetAdventuresUseCaseInput {
  limit: number
  page: number
}

export interface AdventureRepository {
  getAll(input: AdventurePaginationInput): Promise<Adventure[]>
}

export default class GetAdventuresUseCase {
  constructor(private readonly adventureRepository: AdventureRepository) {}

  public async apply(input: GetAdventuresUseCaseInput): Promise<Adventure[]> {
    const limit = new AdventurePageLimit(input.limit)
    const page = new AdventurePageNumber(input.page)
    return this.adventureRepository.getAll({ page, limit })
  }
}
