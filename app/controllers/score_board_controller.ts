import { app } from '#app/core/game'
import { getScoreBoardValidator } from '#validators/score_board'
import { HttpContext } from '@adonisjs/core/http'

export default class ScoreBoardController {
  async handle({ request }: HttpContext) {
    const payload = await getScoreBoardValidator.validate(request.all())

    const tableScore = await app.getScoreBoard.apply(payload)
    return tableScore.rows.map((row) => ({
      name: row.playerName,
      score: row.score,
    }))
  }
}
