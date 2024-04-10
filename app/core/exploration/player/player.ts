import Dungeon from '#app/core/exploration/dungeon/dungeon'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Report from '#app/core/exploration/player/report/report'
import { Tag } from '#app/core/exploration/tag/tag'
import { NumberValidation } from '../../validations/number-validation.js'
import { StringValidation } from '../../validations/string-validation.js'
import { Explorer } from './explorer.js'

export default class Player implements Explorer {
  public readonly name: PlayerName

  constructor(
    name: string,
    private readonly backpack: Backpack
  ) {
    this.name = new PlayerName(name)
  }

  public explore(dungeon: Dungeon): Report {
    const note = dungeon.resolve(this)
    return new Report(this, dungeon, note.comment, note.score)
  }

  public hasTag(tag: Tag): boolean {
    return this.backpack.hasTag(tag)
  }
}

export class PlayerName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export class PlayerScore extends NumberValidation {
  constructor(score: number) {
    super(score, { min: 0, max: Number.POSITIVE_INFINITY })
  }

  public add(score: PlayerScore): PlayerScore {
    return new PlayerScore(score.value + this.value)
  }

  public static Zero = new PlayerScore(0)
}
