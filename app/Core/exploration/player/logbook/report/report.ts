import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import { PlayerScore } from '../../player'
import { StringValidation } from 'App/Core/validations/string-validation'

export default class Report {
  constructor(
    public readonly dungeon: Dungeon,
    public readonly score: PlayerScore,
    public readonly note: Note,
    public readonly exploredAt = new Date()
  ) {}
}

export class Note extends StringValidation {
  constructor(message: string) {
    super(message, { maxLength: 10_000 })
  }
}
