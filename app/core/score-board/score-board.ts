class ScoreBoardItem {
  public readonly playerName: string
  public readonly score: number

  constructor() {}
}

export default class ScoreBoard {
  public readonly rows: ScoreBoardItem[]

  constructor() {
    this.rows = []
  }
}
