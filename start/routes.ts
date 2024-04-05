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

import env from '#start/env'
import router from '@adonisjs/core/services/router'
import { rules, schema } from '@adonisjs/validator'
import { ItemName } from '#app/core/exploration/player/backpack/item/item'
import { app, install } from '#app/core/game'

router.post('/install', async () => {
  const DUNGEON_COUNT = env.get('DUNGEON_COUNT')
  await install({ dungeonCount: DUNGEON_COUNT })
  return 'App is correctly installed'
})

router.get('/dungeons', async ({ request }) => {
  const getDungeonsSchema = schema.create({
    limit: schema.number([rules.range(0, 1000)]),
    page: schema.number([rules.range(0, 10_000)]),
  })

  const payload = await request.validate({ schema: getDungeonsSchema })

  const dungeons = await app.getDungeons.apply(payload)
  return dungeons
})

router.post('/dungeons/:name', async ({ auth, request }) => {
  await auth.use('basic').authenticate()

  const playerName = auth.user!.name

  const exploreResult = await app.exploreDungeon.apply({
    dungeonName: request.param('name'),
    playerName,
  })

  return { score: exploreResult.score }
})

router.post('/players', async ({ request }) => {
  const addPlayerSchema = schema.create({
    name: schema.string([rules.alpha({ allow: ['space', 'dash'] })]),
    password: schema.string(),
  })

  const payload = await request.validate({ schema: addPlayerSchema })

  await app.addPlayer.apply(payload)
})

router.get('/player', async ({ auth }) => {
  await auth.use('basic').authenticate()

  const player = await app.getPlayer.apply({
    name: auth.user!.name,
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

router.post('/player', async ({ auth, request }) => {
  await auth.use('basic').authenticate()

  const addItemsSchema = schema.create({
    itemNames: schema.array().members(schema.string()),
  })

  const { itemNames } = await request.validate({ schema: addItemsSchema })

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

router.get('/scores', async ({ request }) => {
  const getTableScoreSchema = schema.create({
    limit: schema.number([rules.range(0, 1000)]),
    page: schema.number([rules.range(0, 10_000)]),
  })

  const payload = await request.validate({ schema: getTableScoreSchema })

  const tableScore = await app.getScoreBoard.apply(payload)
  return tableScore.rows.map((row) => ({
    name: row.name.get(),
    score: row.score.get(),
  }))
})

router.get('/items', async ({ request }) => {
  const getItemsSchema = schema.create({
    limit: schema.number([rules.range(0, 1000)]),
    page: schema.number([rules.range(0, 10_000)]),
  })

  const payload = await request.validate({ schema: getItemsSchema })

  const items = await app.getItems.apply(payload)
  return items.map((item) => ({
    name: item.name.get(),
  }))
})
