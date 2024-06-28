import { game } from '#app/core/game'
import MaxPlayerErrors from '#app/core/inscription/errors/max-players-errors'
import ForbiddenException from '#exceptions/forbidden_exception'
import { addPlayerValidator } from '#validators/player'
import { HttpContext } from '@adonisjs/core/http'

export default class InscriptionController {
  async handle({ request }: HttpContext) {
    const payload = await addPlayerValidator.validate(request.all())
    try {
      await game.addPlayer(payload)
      return { message: 'Bienvenue aventurier, aventurière. GET /preparation' }
    } catch (err) {
      if (err instanceof MaxPlayerErrors) {
        throw new ForbiddenException(err.message)
      }
      throw err
    }
  }
}
