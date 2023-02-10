import { DungeonServiceExploreDungeonResultRepository } from '../dungeon/dungeon.service'
import { PlayerServiceExploreDungeonResultRepository } from '../player/player.service'
import ExploreDungeonResult from './explore-dungeon-result'

export default class ExploreDungeonResultRepository
  implements
    DungeonServiceExploreDungeonResultRepository,
    PlayerServiceExploreDungeonResultRepository
{
  private exploreDungeonResultHistory: ExploreDungeonResult[] = []

  private readonly exploreDungeonResultTop = new Map<string, ExploreDungeonResult>()

  public async save(result: ExploreDungeonResult): Promise<ExploreDungeonResult> {
    this.exploreDungeonResultHistory.push(result)
    const topResult = this.exploreDungeonResultTop.get(result.player.id)
    if (!topResult || topResult.score.get() < result.score.get()) {
      this.exploreDungeonResultTop.set(result.player.id + result.dungeon.id, result)
    }
    return result
  }

  public async findByPlayerName(name: string): Promise<ExploreDungeonResult[]> {
    return Array.from(this.exploreDungeonResultTop.values()).filter(
      (r) => r.player.name.get() === name
    )
  }

  public flush() {
    this.exploreDungeonResultHistory = []
    this.exploreDungeonResultTop.clear()
  }
}
