import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Player, { PlayerScore } from '../../player'
import { StringValidation } from '../../../../validations/string-validation'

export default class Report {
  public readonly message: ExplorationResultMessage

  constructor(
    public readonly player: Player,
    public readonly dungeon: Dungeon,
    public readonly score: PlayerScore,
    message: string,
    public readonly exploreAt = new Date()
  ) {
    this.message = new ExplorationResultMessage(message)
  }
}

class ExplorationResultMessage extends StringValidation {
  constructor(message: string) {
    super(message, { maxLength: 10_000 })
  }
}
