import { game } from '#app/core/game'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExploreDungeonController {
  async handle({ auth, request }: HttpContext) {
    const playerName = auth.user!.name

    const exploreResult = await game.exploreDungeon.apply({
      dungeonName: request.param('name'),
      playerName,
    })

    return { score: exploreResult.score, report: exploreResult.report }
  }
}
