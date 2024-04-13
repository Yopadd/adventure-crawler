import { game } from '#app/core/game'
import { getScoreBoardValidator } from '#validators/score_board'
import { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import { DateTime, Duration } from 'luxon'

type Payload = Awaited<ReturnType<typeof getScoreBoardValidator.validate>>
type Row = { name: string; score: number }
type CacheData = { data: Row[]; expireAt: DateTime }

export default class ScoreBoardController {
  async handle({ request, view, response }: HttpContext) {
    const payload = await getScoreBoardValidator.validate(request.all())

    let data = await this.checkCache(payload)
    if (data === null) {
      console.debug('Cache as expired')
      const tableScore = await game.getScoreBoard.apply(payload)

      data = tableScore.rows.map((row) => ({
        name: row.playerName,
        score: row.score,
      }))
      await this.cache(payload, data)
    }

    response.header('Cache-Control', 'public, max-age=7')
    if (request.header('Accept')?.includes('text/html')) {
      return view.render('score_board', { data })
    }
    return data
  }

  private async checkCache(payload: Payload): Promise<Row[] | null> {
    const cacheRaw = await redis.get(this.payloadToCacheKey(payload))
    if (!cacheRaw) return null
    const cache = this.parseCacheData(cacheRaw)
    if (cache.expireAt < DateTime.now()) return null
    return cache.data
  }

  private async cache(payload: Payload, data: Row[]) {
    await redis.set(
      this.payloadToCacheKey(payload),
      this.serializeCacheData({
        data,
        expireAt: DateTime.now().plus(Duration.fromMillis(60000)),
      })
    )
  }

  private payloadToCacheKey(payload: Payload): string {
    return `limit=${payload.limit};page=${payload.page}`
  }

  private serializeCacheData(cache: CacheData): string {
    return JSON.stringify({ data: cache.data, expireAt: cache.expireAt.toISO() })
  }

  private parseCacheData(value: string): CacheData {
    const data = JSON.parse(value)
    data.expireAt = DateTime.fromISO(data.expireAt)
    return data
  }
}
