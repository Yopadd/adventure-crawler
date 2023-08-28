import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import { PlayerScore } from '../../player'
import { StringValidation } from '../../../../validations/string-validation'

export default class Report {
  public readonly note: Note

  constructor(
    public readonly dungeon: Dungeon,
    public readonly score: PlayerScore,
    note: string,
    public readonly exploredAt = new Date()
  ) {
    this.note = new Note(note)
  }
}

export class Note extends StringValidation {
  constructor(message: string) {
    super(message, { maxLength: 10_000 })
  }
}
