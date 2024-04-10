import Dungeon from '#app/core/exploration/dungeon/dungeon'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Report from '#app/core/exploration/player/report/report'

export interface Explorer extends EventResolver {
  explore(dungeon: Dungeon): Report
}
