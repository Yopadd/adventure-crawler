import player from '../player/player'
import { GetTableScoreUseCaseTableScoreService } from '../use-cases/get-table-score'
import { default as TableScore, default as tableScore } from './table-score'

export default class TableScoreService implements GetTableScoreUseCaseTableScoreService {
  public async create(players: player[]): Promise<tableScore> {
    return new TableScore(players)
  }
}
