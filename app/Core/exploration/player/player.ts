import ValidationError from '../../errors/validation.error'
import Backpack from 'App/Core/exploration/player/backpack/backpack'
import { NumberValidation } from '../../validations/number-validation'
import { StringValidation } from '../../validations/string-validation'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Report from 'App/Core/exploration/player/logbook/report/report'
import { EventResolver } from 'App/Core/exploration/player/event-resolver'
import { Tag } from 'App/Core/exploration/tag/tag'

export default class Player implements EventResolver {
  public readonly name: PlayerName
  public readonly backpack: Backpack
  private readonly logBook: Report[]

  constructor(name: string, inventory: Backpack) {
    try {
      this.name = new PlayerName(name)
      this.backpack = inventory
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate player "${name}" has failed`, err)
      }
      throw err
    }
  }

  public explore(dungeon: Dungeon): Report {
    if (!dungeon.events.length) {
      return new Report(dungeon, PlayerScore.Zero, '')
    }

    const score = dungeon.events.reduce(
      (acc, event) => event.resolve(this).add(acc),
      PlayerScore.Zero
    )
    const note = dungeon.events.map((event) => event.description).join(', ')
    const report = new Report(dungeon, score, note)

    this.logBook.push(report)
    return report
  }

  public hasTag(tag: Tag): boolean {
    return this.backpack.hasTag(tag)
  }
}

export class PlayerName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 50 })
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
