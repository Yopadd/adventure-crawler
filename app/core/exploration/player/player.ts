import Adventure from '#app/core/exploration/adventure/adventure'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import Report from '#app/core/exploration/player/report/report'
import { Tag } from '#app/core/install/tag/tag'
import { DateTime } from 'luxon'
import { NumberValidation } from '../../validations/number-validation.js'
import { StringValidation } from '../../validations/string-validation.js'
import { Explorer } from './explorer.js'

export type PlayerCommands = {
  egg?: boolean
  cheese?: boolean
  bread?: boolean
  milk?: boolean
}

export type AdventuresVisited = Map<string, { adventure: Adventure; visitedAt: DateTime }>

export default class Player implements Explorer {
  public readonly name: PlayerName
  public commands?: PlayerCommands
  private _adventuresVisited: AdventuresVisited

  constructor(
    name: string,
    public readonly backpack: Backpack,
    adventuresVisited: AdventuresVisited = new Map()
  ) {
    this.name = new PlayerName(name)
    this._adventuresVisited = adventuresVisited
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

  public visit(adventure: Adventure): Player {
    this._adventuresVisited.set(adventure.name.get(), { adventure, visitedAt: DateTime.now() })
    return this
  }

  get adventuresVisited() {
    return Array.from(this._adventuresVisited.values())
      .sort((a, b) => b.visitedAt.toMillis() - a.visitedAt.toMillis())
      .slice(0, 19)
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
