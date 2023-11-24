import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Backpack from 'App/Core/exploration/player/backpack/backpack'
import Logbook from 'App/Core/exploration/player/logbook/logbook'
import Report from 'App/Core/exploration/player/logbook/report/report'
import { Tag } from 'App/Core/exploration/tag/tag'
import { NumberValidation } from '../../validations/number-validation'
import { StringValidation } from '../../validations/string-validation'
import { Explorer } from './explorer'

export default class Player implements Explorer {
  constructor(private readonly backpack: Backpack, private readonly logbook: Logbook) {}

  public explore(dungeon: Dungeon): Report {
    const note = dungeon.resolve(this)
    return new Report(dungeon, note.comment, note.score)
  }

  public hasTag(tag: Tag): boolean {
    return this.backpack.hasTag(tag)
  }

  public write(report: Report): Promise<void> {
    return this.logbook.write(report)
  }
}

export class PlayerName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export class PlayerScore extends NumberValidation {
  constructor(score: number) {
    super(score, { min: 0, max: Infinity })
  }

  public add(score: PlayerScore): PlayerScore {
    return new PlayerScore(score.value + this.value)
  }

  public static Zero = new PlayerScore(0)
}
