import Report from 'App/Core/exploration/player/logbook/report/report'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'

export default interface Logbook {
  write(report: Report): Promise<void>
  dungeonReports(dungeon: Dungeon): Promise<Report[]>
  bestReports(): Promise<Report[]>
}
