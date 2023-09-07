import Dungeon from '../dungeon/dungeon'
import { EventResolver } from './event-resolver'
import Report from './logbook/report/report'

export interface Explorer extends EventResolver {
  explore(dungeon: Dungeon): Report
  write(report: Report): Promise<void>
}
