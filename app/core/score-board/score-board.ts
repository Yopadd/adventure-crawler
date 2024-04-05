import Player from '#app/core/exploration/player/player'

class ScoreBoardItem {
  public readonly playerName: string
  public readonly score: number

  constructor(player: Player) {}
}

export default class ScoreBoard {
  public readonly rows: ScoreBoardItem[]

  constructor(private readonly players: Player[] = []) {
    this.rows = []
  }
}
