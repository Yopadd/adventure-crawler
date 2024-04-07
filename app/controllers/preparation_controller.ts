import { app } from '#app/core/game'
import { ItemName } from '#app/core/preparation/item/item'
import { getDungeonsValidator } from '#validators/dungeon'
import { addItemsValidator, getItemsValidator } from '#validators/item'
import type { HttpContext } from '@adonisjs/core/http'

export default class PreparationController {
  async addItems({ auth, request }: HttpContext) {
    const { itemNames } = await addItemsValidator.validate(request.all())

    await app.addItems.apply({
      playerName: auth.user!.name,
      itemNames: itemNames.map((name) => new ItemName(name)),
    })
  }

  async openBackpack({ auth }: HttpContext) {
    const backpack = await app.getBackpack.apply({
      playerName: auth.user!.name,
    })

    return {
      items: backpack.open().map((item) => item.name.get()),
    }
  }

  async getDungeons({ request }: HttpContext) {
    const payload = await getDungeonsValidator.validate(request.all())

    const dungeons = await app.getDungeons.apply(payload)
    return dungeons.map((dungeon) => ({
      name: dungeon.name.get(),
    }))
  }

  async getItems({ request }: HttpContext) {
    const payload = await getItemsValidator.validate(request.all())

    const items = await app.getItems.apply(payload)
    return items.map((item) => ({
      name: item.name.get(),
    }))
  }
}
