/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { ItemName } from '#app/core/exploration/player/backpack/item/item'
import { app, install } from '#app/core/game'
import env from '#start/env'
import { middleware } from '#start/kernel'
import { getDungeonsValidator } from '#validators/dungeon'
import { addItemsValidator, getItemsValidator } from '#validators/item'
import { addPlayerValidator } from '#validators/player'
import { getScoreBoardValidator } from '#validators/score_board'
import router from '@adonisjs/core/services/router'

router.post('/install', async () => {
  const DUNGEON_COUNT = env.get('DUNGEON_COUNT')
  await install({ dungeonCount: DUNGEON_COUNT })
  return 'App is correctly installed'
})

router.get('/dungeons', async ({ request }) => {
  const payload = await getDungeonsValidator.validate(request.all())

  const dungeons = await app.getDungeons.apply(payload)
  return dungeons.map((dungeon) => ({
    name: dungeon.name.get(),
  }))
})

router
  .post('/dungeons/:name', async ({ auth, request }) => {
    const playerName = auth.user!.name

    const exploreResult = await app.exploreDungeon.apply({
      dungeonName: request.param('name'),
      playerName,
    })

    return { score: exploreResult.score }
  })
  .use(
    middleware.auth({
      guards: ['basic'],
    })
  )

router.post('/players', async ({ request }) => {
  const payload = await addPlayerValidator.validate(request.all())

  await app.addPlayer.apply(payload)
})

router
  .post('/player', async ({ auth, request }) => {
    const { itemNames } = await addItemsValidator.validate(request.all())

    const player = await app.addItems.apply({
      playerName: auth.user!.name,
      itemNames: itemNames.map((name) => new ItemName(name)),
    })

    return {
      name: player.name.get(),
      score: player.score.get(),
      inventory: player.backpack.items.map((item) => ({
        name: item.name.get(),
        description: item.description.get(),
      })),
    }
  })
  .use(
    middleware.auth({
      guards: ['basic'],
    })
  )

router.get('/scores', async ({ request }) => {
  const payload = await getScoreBoardValidator.validate(request.all())

  const tableScore = await app.getScoreBoard.apply(payload)
  return tableScore.rows.map((row) => ({
    name: row.playerName,
    score: row.score,
  }))
})

router.get('/items', async ({ request }) => {
  const payload = await getItemsValidator.validate(request.all())

  const items = await app.getItems.apply(payload)
  return items.map((item) => ({
    name: item.name.get(),
  }))
})
