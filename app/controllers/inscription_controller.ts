import { app } from '#app/core/game'
import { addPlayerValidator } from '#validators/player'
import { HttpContext } from '@adonisjs/core/http'

export default class InscriptionController {
  async handle({ request }: HttpContext) {
    const payload = await addPlayerValidator.validate(request.all())

    await app.addPlayer.apply(payload)
  }
}
