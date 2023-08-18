import { UseCase } from '../application'
import GetPageInput from '../pages/get-page-input'
import Player from 'App/Core/exploration/player/player'
import ScoreBoard from 'App/Core/scoring/score-board/score-board'

interface GetScoreBoardUseCaseInput {
  limit: number
  page: number
}

export interface GetScoreBoardUseCaseScoreBoardService {
  create(players: Player[]): Promise<ScoreBoard>
}

export interface GetScoreBoardUseCasePlayerService {
  getAll(input: GetPageInput): Promise<Player[]>
}

export default class GetTableScoreUseCase
  implements UseCase<GetScoreBoardUseCaseInput, Promise<ScoreBoard>>
{
  constructor(
    private readonly playerService: GetScoreBoardUseCasePlayerService,
    private readonly tableScoreService: GetScoreBoardUseCaseScoreBoardService
  ) {}

  public async apply(input: GetScoreBoardUseCaseInput): Promise<ScoreBoard> {
    const players = await this.playerService.getAll(new GetPageInput(input))
    return this.tableScoreService.create(players)
  }
}
