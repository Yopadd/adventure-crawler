import { game } from '#app/core/game'
import { getScoreBoardValidator } from '#validators/score_board'
import { HttpContext } from '@adonisjs/core/http'

export default class ScoreBoardController {
  async handle({ request, view }: HttpContext) {
    const payload = await getScoreBoardValidator.validate(request.all())

    const tableScore = await game.getScoreBoard.apply(payload)

    const data = tableScore.rows.map((row) => ({
      name: row.playerName,
      score: row.score,
    }))

    if (request.header('Accept')?.includes('text/html')) {
      return view.render('score_board', { data })
    }

    return data
  }
}
