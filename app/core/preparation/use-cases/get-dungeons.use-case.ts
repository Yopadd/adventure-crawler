import Dungeon, {
  DungeonPageLimit,
  DungeonPageNumber,
  DungeonPaginationInput,
} from '#app/core/preparation/dungeon/dungeon'

interface GetDungeonsUseCaseInput {
  limit: number
  page: number
}

export interface DungeonRepository {
  getAll(input: DungeonPaginationInput): Promise<Dungeon[]>
}

export default class GetDungeonsUseCase {
  constructor(private readonly dungeonRepository: DungeonRepository) {}

  public async apply(input: GetDungeonsUseCaseInput): Promise<Dungeon[]> {
    const limit = new DungeonPageLimit(input.limit)
    const page = new DungeonPageNumber(input.page)
    return this.dungeonRepository.getAll({ page, limit })
  }
}
