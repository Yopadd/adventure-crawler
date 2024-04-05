import player from '#app/core/exploration/player/player'
import { GetScoreBoardUseCaseScoreBoardService } from '../../use-cases/get-table-score.js'
import { default as TableScore, default as tableScore } from './score-board.js'

export default class ScoreBoardService implements GetScoreBoardUseCaseScoreBoardService {
  public async create(players: player[]): Promise<tableScore> {
    return new TableScore(players)
  }
}
