import Report from 'App/Core/exploration/player/logbook/report/report'
import Logbook from 'App/Core/exploration/player/logbook/logbook'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'

interface LogbookServiceLogbookRepository {
  save(logbook: Logbook, report: Report): Logbook
  getReportsByDungeon(logbook: Logbook, dungeon: Dungeon): Logbook
  findBestReports(logbook: Logbook): Logbook
}
export default class LogbookService {
  constructor(private readonly logBookRepository: LogbookServiceLogbookRepository) {}

  public write(logbook: Logbook, report: Report): Logbook {
    return this.logBookRepository.save(logbook, report)
  }

  public dungeonReports(logbook: Logbook, dungeon: Dungeon): Logbook {
    return this.logBookRepository.getReportsByDungeon(logbook, dungeon)
  }

  public bestReports(logbook: Logbook): Logbook {
    return this.logBookRepository.findBestReports(logbook)
  }
}
