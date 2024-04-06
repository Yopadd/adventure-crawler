import Logbook from '#app/core/exploration/player/logbook/logbook'
import { LogbookRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import PlayerModel from '#models/player.model'
import ReportModel from '#models/report.model'
import db from '@adonisjs/lucid/services/db'
import { randomUUID } from 'node:crypto'

export default class LogbookRepositoryDatabase implements LogbookRepository {
  public async save(playerName: string, logbook: Logbook): Promise<void> {
    return db.transaction(async (trx) => {
      const player = await PlayerModel.findOrFail(playerName, {
        client: trx,
      })
      const reports = logbook.read().map((report) => ({
        id: randomUUID(),
        comment: report.comment.get(),
        exploredAt: report.exploredAt,
        score: report.score.get(),
      }))
      const reportModel = await ReportModel.createMany(reports, {
        client: trx,
      })
      await player.load('logbook')
      await player.logbook.related('reports').attach(reportModel.map((model) => model.id))
    })
  }
}
