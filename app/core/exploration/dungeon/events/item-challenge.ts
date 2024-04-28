import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { NumberValidation } from '#app/core/validations/number-validation'
import { randomInt } from 'node:crypto'

export default class ItemChallenge extends EventBase<Player> {
  private readonly challenge: ItemChallengeNumber

  constructor(challenge: number) {
    const c = new ItemChallengeNumber(challenge)
    super(`Item Challenge:${c.get()}`, challenge.toString())
    this.challenge = c
  }

  public resolve(player: Player): Note {
    const str = player.getAllTags().join('').replaceAll(' ', '')

    const n = ItemChallenge.computeScore(str)
    const result = Math.min(Math.abs(this.challenge.get() - n), 10)
    const score = 10 - result

    return new Note(score.toString(), score)
  }

  public static randomScoreMaxFrom(value: string): number {
    const max = Array.from(value)
      .map((c) => c.charCodeAt(0))
      .reduce((a, b) => a + b, 0)
    return randomInt(0, max)
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
