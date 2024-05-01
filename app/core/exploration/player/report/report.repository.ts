import Report from '#app/core/exploration/player/report/report'
import { ReportRepository } from '#app/core/exploration/use-cases/explore-adventure.use-case'
import ReportModel from '#models/report.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ReportRepositoryDatabase implements ReportRepository {
  public async save(report: Report, client: TransactionClientContract): Promise<void> {
    await ReportModel.updateOrCreate(
      {
        playerName: report.player.name.get(),
        adventureName: report.adventure.name.get(),
      },
      {
        playerName: report.player.name.get(),
        adventureName: report.adventure.name.get(),
        comment: report.comment,
        exploredAt: report.exploredAt,
        score: report.score,
      },
      {
        client,
      }
    )
  }
}
