import { game } from '#app/core/game'
import { getScoreBoardValidator } from '#validators/score_board'
import { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import { DateTime } from 'luxon'

type Payload = Awaited<ReturnType<typeof getScoreBoardValidator.validate>>
type RowData = { rows: { name: string; score: number }[]; updatedAt: DateTime }

export default class ScoreBoardController {
  async handle({ request, view, response }: HttpContext) {
    const payload = await getScoreBoardValidator.validate(request.all())

    let data = await this.checkCache(payload)
    if (data === null) {
      const tableScore = await game.getScoreBoard(payload)

      data = {
        rows: tableScore.rows.map((row) => ({
          name: row.playerName,
          score: row.score,
        })),
        updatedAt: DateTime.now(),
      }
      await this.cache(payload, data)
    }

    response.header('Cache-Control', 'public, max-age=5')
    if (request.header('Accept')?.includes('text/html')) {
      return view.render('score_board', { data })
    }
    return data
  }

  private async checkCache(payload: Payload): Promise<RowData | null> {
    const cacheRaw = await redis.get(this.payloadToCacheKey(payload))
    if (!cacheRaw) return null
    const cache = this.parseCacheData(cacheRaw)
    return cache
  }

  private async cache(payload: Payload, data: RowData) {
    await redis.set(this.payloadToCacheKey(payload), this.serializeCacheData(data), 'EX', 5)
  }

  private payloadToCacheKey(payload: Payload): string {
    return `limit=${payload.limit};page=${payload.page}`
  }

  private serializeCacheData(data: RowData): string {
    return JSON.stringify(data)
  }

  private parseCacheData(value: string): RowData {
    const rawJSON = JSON.parse(value)
    rawJSON.updatedAt = DateTime.fromISO(rawJSON.updatedAt)
    return rawJSON
  }
}
