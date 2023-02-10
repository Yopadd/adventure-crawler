import { UseCase } from '../application'
import GetPageInput from '../pages/get-page-input'
import Player from '../player/player'
import TableScore from '../table-score/table-score'

interface GetTableScoreUseCaseInput {
  limit: number
  page: number
}

export interface GetTableScoreUseCaseTableScoreService {
  create(players: Player[]): Promise<TableScore>
}

export interface GetTableScoreUseCasePlayerService {
  getAll(input: GetPageInput): Promise<Player[]>
}

export default class GetTableScoreUseCase
  implements UseCase<GetTableScoreUseCaseInput, Promise<TableScore>>
{
  constructor(
    private readonly playerService: GetTableScoreUseCasePlayerService,
    private readonly tableScoreService: GetTableScoreUseCaseTableScoreService
  ) {}

  public async apply(input: GetTableScoreUseCaseInput): Promise<TableScore> {
    const players = await this.playerService.getAll(new GetPageInput(input))
    return this.tableScoreService.create(players)
  }
}
