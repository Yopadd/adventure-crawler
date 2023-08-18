import { DungeonServiceExploreDungeonResultRepository } from 'App/Core/exploration/dungeon/dungeon.service'
import { PlayerServiceExploreResultRepository } from '../../player.service'
import Report from './report'

export default class ReportRepository
  implements DungeonServiceExploreDungeonResultRepository, PlayerServiceExploreResultRepository
{
  private explorationHistory: Report[] = []

  private readonly explorationResultTop = new Map<string, Report>()

  public async save(result: Report): Promise<Report> {
    this.explorationHistory.push(result)
    const topResult = this.explorationResultTop.get(result.player.id)
    if (!topResult || topResult.score < result.score) {
      this.explorationResultTop.set(result.player.id + result.dungeon.id, result)
    }
    return result
  }

  public async findByPlayerName(name: string): Promise<Report[]> {
    return Array.from(this.explorationResultTop.values()).filter(
      (r) => r.player.name.get() === name
    )
  }

  public flush() {
    this.explorationHistory = []
    this.explorationResultTop.clear()
  }
}
