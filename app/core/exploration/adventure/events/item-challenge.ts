import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { NumberValidation } from '#app/core/validations/number-validation'

export default class ItemChallenge extends EventBase<Player> {
  private readonly challenge: ItemChallengeNumber

  constructor(challenge: number) {
    const c = new ItemChallengeNumber(challenge)
    super(`Item Challenge:${c.get()}`, challenge.toString())
    this.challenge = c
  }

  public resolve(player: Player, note: Note): boolean {
    const str = player.getAllTags().join('').replaceAll(' ', '')

    const n = ItemChallenge.computeScore(str)
    const result = Math.min(Math.abs(this.challenge.get() - n), 10)
    const score = 10 - result

    note.add(new Note(score.toString(), score))
    return false
  }

  private static computeScore(value: string): number {
    return Array.from(value)
      .map((c) => c.charCodeAt(0))
      .reduce((a, b) => a + b, 0)
  }
}

class ItemChallengeNumber extends NumberValidation {
  constructor(value: number) {
    super(value, { min: 0, safe: true })
  }
}
