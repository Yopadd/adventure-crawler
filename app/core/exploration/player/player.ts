import Adventure from '#app/core/exploration/adventure/adventure'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Report from '#app/core/exploration/player/report/report'
import { Tag } from '#app/core/install/tag/tag'
import { NumberValidation } from '../../validations/number-validation.js'
import { StringValidation } from '../../validations/string-validation.js'
import { Explorer } from './explorer.js'

export default class Player implements Explorer {
  public readonly name: PlayerName

  constructor(
    name: string,
    public readonly backpack: Backpack
  ) {
    this.name = new PlayerName(name)
  }

  public explore(adventure: Adventure): Report {
    const notes = adventure.resolve(this)
    return new Report(this, adventure, notes)
  }

  public hasTag(...tags: Tag[]): boolean {
    return tags.every((tag) => this.backpack.hasTag(tag))
  }

  public countTag(tag: Tag): number {
    return this.backpack.countTag(tag)
  }

  public getAllTags(): Tag[] {
    return this.backpack.getAllTags()
  }
}

export class PlayerName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export class PlayerScore extends NumberValidation {
  constructor(score: number) {
    super(score, { min: 0, safe: true })
  }

  public static Zero = new PlayerScore(0)
}
