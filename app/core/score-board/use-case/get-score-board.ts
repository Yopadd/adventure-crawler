import ScoreBoard from '#app/core/score-board/score-board'

interface GetScoreBoardUseCaseInput {
  limit: number
  page: number
}

export default class GetScoreboardUseCase {
  constructor() {}

  public async apply(input: GetScoreBoardUseCaseInput): Promise<ScoreBoard> {
    return new ScoreBoard()
  }
}
