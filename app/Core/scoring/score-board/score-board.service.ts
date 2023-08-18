import player from 'App/Core/exploration/player/player'
import { GetScoreBoardUseCaseScoreBoardService } from '../../use-cases/get-table-score'
import { default as TableScore, default as tableScore } from './score-board'

export default class ScoreBoardService implements GetScoreBoardUseCaseScoreBoardService {
  public async create(players: player[]): Promise<tableScore> {
    return new TableScore(players)
  }
}
