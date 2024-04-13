import Player from '#app/core/score-board/player/player'
import { DateTime } from 'luxon'

class ScoreBoardItem {
  public readonly playerName: string
  public readonly score: number
  public readonly updatedAt: DateTime

  constructor(player: Player) {
    this.playerName = player.name.get()
    this.score = player.score.get()
    this.updatedAt = DateTime.now()
  }
}

export default class ScoreBoard {
  public readonly rows: ScoreBoardItem[]

  constructor(players: Player[]) {
    this.rows = players.map((p) => new ScoreBoardItem(p))
  }
}
