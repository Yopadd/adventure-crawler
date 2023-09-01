import { UseCase } from '../../application'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import GetPageInput from '../../pages/get-page-input'

interface GetDungeonsUseCaseInput {
  limit: number
  page: number
}

export interface GetDungeonsUseCaseDungeonService {
  getAll(input: GetPageInput): Promise<Dungeon[]>
}

export default class GetDungeonsUseCase
  implements UseCase<GetDungeonsUseCaseInput, Promise<string[]>>
{
  constructor(private readonly dungeonService: GetDungeonsUseCaseDungeonService) {}

  public async apply(input: GetDungeonsUseCaseInput): Promise<string[]> {
    const dungeons = await this.dungeonService.getAll(new GetPageInput(input))
    return dungeons.map((d) => d.id)
  }
}
