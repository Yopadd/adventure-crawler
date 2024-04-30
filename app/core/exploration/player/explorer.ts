import Adventure from '#app/core/exploration/adventure/adventure'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Report from '#app/core/exploration/player/report/report'

export interface Explorer extends EventResolver {
  explore(adventure: Adventure): Report
}
