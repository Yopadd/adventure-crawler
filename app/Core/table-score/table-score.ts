import Player, { PlayerName, PlayerScore } from '../player/player'

class TableScoreItem {
  public readonly name: PlayerName
  public readonly score: PlayerScore

  constructor(player: Player) {
    this.name = player.name
    this.score = player.score
  }
}

export default class TableScore {
  public readonly rows: TableScoreItem[]

  constructor(private readonly players: Player[] = []) {
    this.rows = this.players.map((player) => new TableScoreItem(player))
  }
}
