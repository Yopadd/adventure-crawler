import env from '#start/env'
import { test } from '@japa/runner'

test('Explore Aazzidy adventure, a simple adventure with several kind of event', async ({
  client,
  expect,
}) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'Player'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  const itemsResp = await client.get('/preparation/items').qs({
    limit: 2,
    page: 1,
  })
  const items: Array<{ name: string }> = itemsResp.body().items

  await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: items.map((item) => item.name) })

  // Explore adventure
  let response = await client.post(`/exploration/adventures/Aazzidy`).basicAuth(name, password)

  expect(response.status()).toBe(200)
  expect(response.body()).toEqual({
    score: expect.any(Number),
    report: expect.any(String),
  })
})

test('Explore Farm adventure, an adventure that use commands', async ({ client, expect }) => {
  await client.post('/install').bearerToken(env.get('APP_KEY'))
  const name = 'Player'
  const password = '1234'
  await client.post('/inscription').json({ name, password })

  // Explore without commands and money
  let response = await client.post(`/exploration/adventures/Farm`).basicAuth(name, password)

  expect(response.body().report).toBe(
    "Jour 1; Une ferme tenue par un couple de personnes âgées; Le couple me proposait d'acheter quelques produits; Je n'avais malheureusement pas de quoi leur acheter des produits, ils m'ont quand même donné des œufs\n"
  )

  // Explore without commands only
  await client
    .post(`/preparation/backpack`)
    .basicAuth(name, password)
    .json({ itemsName: ["Sac de pièce d'or"] })

  response = await client.post(`/exploration/adventures/Farm`).basicAuth(name, password)

  expect(response.body().report).toBe(
    "Jour 1; Une ferme tenue par un couple de personnes âgées; Le couple me proposait d'acheter quelques produits; POST {egg: boolean, cheese: boolean, bread: boolean, milk: boolean}; Je n'avais besoin de rien\n"
  )

  // Explore with commands and money
  response = await client
    .post(`/exploration/adventures/Farm`)
    .basicAuth(name, password)
    .json({ egg: true })

  expect(response.body().report).toBe(
    "Jour 1; Une ferme tenue par un couple de personnes âgées; Le couple me proposait d'acheter quelques produits; POST {egg: boolean, cheese: boolean, bread: boolean, milk: boolean}; L'œuf avait une étrange couleur d'or\n"
  )

  response = await client.get(`/preparation/backpack`).basicAuth(name, password)

  expect(response.body().items).toEqual(['Oeuf en or', "Sac de pièce d'or"])
})
