import { randomUUID } from 'crypto'
import ValidationError from '../../errors/validation.error'
import Backpack from 'App/Core/exploration/player/backpack/backpack'
import { NumberValidation } from '../../validations/number-validation'
import { StringValidation } from '../../validations/string-validation'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Report from 'App/Core/exploration/player/logbook/report/report'

export default class Player {
  public readonly id = randomUUID()
  public readonly name: PlayerName
  public readonly backpack: Backpack
  private readonly explorationHistory: Report[]

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

  public get score(): PlayerScore {
    return this.explorationHistory.reduce(
      (acc, explorationResult) => explorationResult.score.add(acc),
      PlayerScore.Zero
    )
  }

  public explore(dungeon: Dungeon): PlayerScore {
    if (!dungeon.events.length) {
      return PlayerScore.Zero
    }

    return dungeon.events.reduce((acc, event) => event.resolve(this).add(acc), PlayerScore.Zero)
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
