import Player, { PlayerName, PlayerScore } from '#app/core/exploration/player/player'

class ScoreBoardItem {
  public readonly name: PlayerName
  public readonly score: PlayerScore

  constructor(player: Player) {
    this.name = player.name
    this.score = player.score
  }
}

export default class ScoreBoard {
  public readonly rows: ScoreBoardItem[]

  constructor(private readonly players: Player[] = []) {
    this.rows = this.players.map((player) => new ScoreBoardItem(player))
  }
}
