import { game } from '#app/core/game'
import BackpackFullError from '#app/core/preparation/backpack/backpack-full.error'
import { ItemName } from '#app/core/preparation/item/item'
import ForbiddenException from '#exceptions/forbidden_exception'
import { getDungeonsValidator } from '#validators/dungeon'
import { addItemsValidator, getItemsValidator } from '#validators/item'
import type { HttpContext } from '@adonisjs/core/http'

export default class PreparationController {
  async index({ view }: HttpContext) {
    return view.render('preparation')
  }

  async addItems({ auth, request }: HttpContext) {
    const { itemsName } = await addItemsValidator.validate(request.all())

    try {
      await game.addItems.apply({
        playerName: auth.user!.name,
        itemsName: itemsName.map((name) => new ItemName(name)),
      })
    } catch (err) {
      if (err instanceof BackpackFullError) {
        throw new ForbiddenException(err.message)
      }
      throw err
    }
  }

  async openBackpack({ auth }: HttpContext) {
    const backpack = await game.getBackpack.apply({
      playerName: auth.user!.name,
    })

    return {
      items: backpack.open().map((item) => item.name.get()),
    }
  }

  async getDungeons({ request }: HttpContext) {
    const payload = await getDungeonsValidator.validate(request.all())

    const dungeons = await game.getDungeons.apply(payload)
    return dungeons.map((dungeon) => ({
      name: dungeon.name.get(),
    }))
  }

  async getItems({ request }: HttpContext) {
    const payload = await getItemsValidator.validate(request.all())

    const items = await game.getItems.apply(payload)
    return items.map((item) => ({
      name: item.name.get(),
      description: item.description.get(),
    }))
  }
}
