import { game } from '#app/core/game'
import { addPlayerValidator } from '#validators/player'
import { HttpContext } from '@adonisjs/core/http'

export default class InscriptionController {
  async handle({ request }: HttpContext) {
    const payload = await addPlayerValidator.validate(request.all())

    await game.addPlayer.apply(payload)
    return { message: 'Bienvenu aventurier, GET /preparation' }
  }
}
