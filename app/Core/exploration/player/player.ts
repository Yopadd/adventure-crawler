import ValidationError from '../../errors/validation.error'
import Backpack from 'App/Core/exploration/player/backpack/backpack'
import { NumberValidation } from '../../validations/number-validation'
import { StringValidation } from '../../validations/string-validation'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Report, { Note } from 'App/Core/exploration/player/logbook/report/report'
import { EventResolver } from 'App/Core/exploration/player/event-resolver'
import { Tag } from 'App/Core/exploration/tag/tag'
import Logbook from 'App/Core/exploration/player/logbook/logbook'

export default class Player implements EventResolver {
  constructor(
    public readonly name: PlayerName,
    public readonly backpack: Backpack,
    private readonly logbook: Logbook
  ) {}

  public async explore(dungeon: Dungeon): Promise<Report> {
    const note = dungeon.resolve(this)
    const report = new Report(dungeon, note.score, note.comment)
    if (!dungeon.events.length) {
      const report = new Report(dungeon, PlayerScore.Zero, new Note(''))
      await this.logbook.write(report)
      return report
    }

    const score = dungeon.events.reduce(
      (acc, event) => event.resolve(this).add(acc),
      PlayerScore.Zero
    )
    const note = new Note(dungeon.events.map((event) => event.description).join(', '))
    const report = new Report(dungeon, score, note)
    await this.logbook.write(report)
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
