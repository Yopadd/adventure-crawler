import ScoreBoard from '#app/core/score-board/score-board'

interface GetScoreBoardUseCaseInput {
  limit: number
  page: number
}

export default class GetScoreboardUseCase {
  constructor() {}

  public async apply(_: GetScoreBoardUseCaseInput): Promise<ScoreBoard> {
    return new ScoreBoard()
  }
}
