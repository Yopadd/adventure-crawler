import { LogbookRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import PlayerModel from '#models/player.model'
import ReportModel from '#models/report.model'
import db from '@adonisjs/lucid/services/db'
import { randomUUID } from 'node:crypto'
import Logbook from '#app/core/exploration/player/logbook/logbook'

export default class LogbookRepositoryDatabase implements LogbookRepository {
  public async save(playerName: string, logbook: Logbook): Promise<void> {
    return db.transaction(async (transaction) => {
      const player = await PlayerModel.findOrFail(playerName, {
        client: transaction,
      })
      const reports = logbook.reports.map((report) => ({
        id: randomUUID(),
        comment: report.comment.get(),
        exploredAt: report.exploredAt,
        score: report.score.get(),
      }))
      const reportModel = await ReportModel.createMany(reports, {
        client: transaction,
      })
      await player.load('logbook')
      player.logbook.related('reports').attach(reportModel.map((model) => model.id))
    })
  }
}
