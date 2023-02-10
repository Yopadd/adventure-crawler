import { test } from '@japa/runner'
import { Application, install } from 'App/Core/application'

let app: Application

test('Get first 10 dungeons', async ({ expect }) => {
  const dungeons = await app.getDungeons.apply({ limit: 10, page: 1 })
  expect(dungeons).toHaveLength(10)
}).setup(async () => {
  app = await install({ countOfDungeon: 20 })
  return () => app.flush()
})
