import { NumberValidation } from '#app/core/validations/number-validation'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Player {
  public readonly name: PlayerName
  public score: PlayerScore

  constructor(name: string, score: number) {
    this.name = new PlayerName(name)
    this.score = new PlayerScore(score)
  }
}

export class PlayerName extends StringValidation {
  constructor(value: string) {
    super(value)
  }
}

export class PlayerScore extends NumberValidation {
  constructor(value: number) {
    super(value, { min: 0 })
  }
}
