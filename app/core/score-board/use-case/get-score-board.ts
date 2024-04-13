import Player from '#app/core/score-board/player/player'
import ScoreBoard from '#app/core/score-board/score-board'

interface GetScoreBoardUseCaseInput {
  limit: number
  page: number
}

export interface PlayerRepository {
  getAll(input: { limit: number; page: number }): Promise<Player[]>
}

export default class GetScoreboardUseCase {
  constructor(private readonly playerRepository: PlayerRepository) {}

  public async apply(input: GetScoreBoardUseCaseInput): Promise<ScoreBoard> {
    const players = await this.playerRepository.getAll(input)
    return new ScoreBoard(players)
  }
}
