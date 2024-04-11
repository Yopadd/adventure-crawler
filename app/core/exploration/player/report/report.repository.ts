import Report from '#app/core/exploration/player/report/report'
import { ReportRepository } from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import ReportModel from '#models/report.model'

export default class ReportRepositoryDatabase implements ReportRepository {
  public async save(report: Report): Promise<void> {
    await ReportModel.updateOrCreate(
      {
        playerName: report.player.name.get(),
        dungeonName: report.dungeon.name.get(),
      },
      {
        playerName: report.player.name.get(),
        dungeonName: report.dungeon.name.get(),
        comment: report.comment.get(),
        exploredAt: report.exploredAt,
        score: report.score.get(),
      }
    )
  }
}
