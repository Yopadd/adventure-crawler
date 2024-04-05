import Dungeon from '#app/core/exploration/dungeon/dungeon'

interface GetDungeonsUseCaseInput {
  limit: number
  page: number
}

export interface GetDungeonsUseCaseDungeonService {
  getAll(input: GetPageInput): Promise<Dungeon[]>
}

export default class GetDungeonsUseCase {
  constructor(private readonly dungeonService: GetDungeonsUseCaseDungeonService) {}

  public async apply(input: GetDungeonsUseCaseInput): Promise<string[]> {
    const dungeons = await this.dungeonService.getAll(new GetPageInput(input))
    return dungeons.map((d) => d.id)
  }
}
