import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Logbook from 'App/Core/exploration/player/logbook/logbook'
import ReportModel from 'App/Models/Report.model'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import Report from './report/report'

export default class LogbookRepositoryDatabase implements Logbook {
  public async write(report: Report): Promise<void> {
    ReportModel.create({
      id: randomUUID(),
      comment: report.comment.get(),
      exploredAt: DateTime.fromJSDate(report.exploredAt),
      score: report.score.get(),
    })
  }

  public async bestReports(): Promise<Report[]> {
    return []
  }

  public async dungeonReports(dungeon: Dungeon): Promise<Report[]> {
    return []
  }
}
