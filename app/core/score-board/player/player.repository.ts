import Player from '#app/core/score-board/player/player'
import { PlayerRepository } from '#app/core/score-board/use-case/get-score-board'
import db from '@adonisjs/lucid/services/db'

export default class PlayerRepositoryDatabase implements PlayerRepository {
  async getAll(input: { limit: number; page: number }): Promise<Player[]> {
    const result = await db
      .from('players')
      .select('name', db.raw('coalesce(sum(score), 0)::int as total_score'))
      .leftJoin('reports', 'players.name', '=', 'reports.player_name')
      .groupBy('name')
      .orderBy('total_score', 'desc')
      .paginate(input.page, input.limit)

    return result.all().map((r) => new Player(r.name, r.total_score === null ? 0 : r.total_score))
  }
}
