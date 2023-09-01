import Report from './report'
import Logbook from 'App/Core/exploration/player/logbook/logbook'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'

export default class ReportRepository implements Logbook {
  private reports: Report[] = []

  public async write(result: Report): Promise<void> {
    this.reports.push(result)
  }

  public async bestReports(): Promise<Report[]> {
    return []
  }

  public async dungeonReports(dungeon: Dungeon): Promise<Report[]> {
    return []
  }

  public flush() {
    this.reports = []
  }
}
