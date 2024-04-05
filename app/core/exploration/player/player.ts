import Dungeon from '#app/core/exploration/dungeon/dungeon'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import { Tag } from '#app/core/exploration/tag/tag'
import { NumberValidation } from '../../validations/number-validation.js'
import { StringValidation } from '../../validations/string-validation.js'
import { Explorer } from './explorer.js'
import Report from '#app/core/exploration/player/logbook/report/report'
import Logbook from '#app/core/exploration/player/logbook/logbook'

export default class Player implements Explorer {
  constructor(
    private readonly backpack: Backpack,
    public readonly logbook: Logbook
  ) {}

  public explore(dungeon: Dungeon): Report {
    const note = dungeon.resolve(this)
    return new Report(dungeon, note.comment, note.score)
  }

  public hasTag(tag: Tag): boolean {
    return this.backpack.hasTag(tag)
  }

  public write(report: Report): void {
    this.logbook.add(report)
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
