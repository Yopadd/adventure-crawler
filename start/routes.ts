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

import Route from '@ioc:Adonis/Core/Route'
import { app, install } from '../app/Core/application'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { PageLimit, PageNumber } from '../app/Core/pages/get-page-input'
import Env from '@ioc:Adonis/Core/Env'

Route.post('/install', async () => {
  await install({ countOfDungeon: Env.get('COUNT_OF_DUNGEON') })
  return 'App is correctly installed'
})

Route.get('/dungeons', async ({ request }) => {
  const getDungeonsSchema = schema.create({
    limit: schema.number([rules.range(PageLimit.min, PageLimit.max)]),
    page: schema.number([rules.range(PageNumber.min, PageNumber.max)]),
  })

  const payload = await request.validate({ schema: getDungeonsSchema })

  const dungeons = await app.getDungeons.apply(payload)
  return dungeons
})

Route.post('/players', async ({ request }) => {
  const addPlayerSchema = schema.create({
    name: schema.string([rules.alpha({ allow: ['space', 'dash'] })]),
    password: schema.string(),
  })

  const payload = await request.validate({ schema: addPlayerSchema })

  const player = await app.addPlayer.apply(payload)
  return {
    id: player.id,
    name: player.name.get(),
    score: player.score.get(),
  }
})

Route.post('/players/:id/inventory', async ({ auth }) => {
  await auth.use('basic').authenticate()

  return `You are logged in as ${auth.user!.name}`
})

Route.get('/scores', async ({ request }) => {
  const getTableScoreSchema = schema.create({
    limit: schema.number([rules.range(PageLimit.min, PageLimit.max)]),
    page: schema.number([rules.range(PageNumber.min, PageNumber.max)]),
  })

  const payload = await request.validate({ schema: getTableScoreSchema })

  const tableScore = await app.getTableScore.apply(payload)
  return tableScore.rows.map((row) => ({
    name: row.name.get(),
    score: row.score.get(),
  }))
})

Route.get('/items', async ({ request }) => {
  const getItemsSchema = schema.create({
    limit: schema.number([rules.range(PageLimit.min, PageLimit.max)]),
    page: schema.number([rules.range(PageNumber.min, PageNumber.max)]),
  })

  const payload = await request.validate({ schema: getItemsSchema })

  const items = await app.getItems.apply(payload)
  return items.map((item) => ({
    name: item.name,
    description: item.description,
  }))
})
