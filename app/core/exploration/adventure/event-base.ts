import ValidationError from '#app/core/errors/validation.error'
import {
  AdventureEvent,
  AdventureEventDescription,
} from '#app/core/exploration/adventure/adventure'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/event'
import Item from '#app/core/install/item/item'
import { randomInt } from 'node:crypto'

export default abstract class EventBase<T extends EventResolver> implements AdventureEvent<T> {
  public readonly description: AdventureEventDescription

  protected constructor(
    public readonly name: EventName,
    description: string
  ) {
    try {
      this.description = new AdventureEventDescription(description)
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate "${this.name}" description has failed`, err)
      }
      throw err
    }
  }

  public resolve(_: T, note: Note): boolean {
    note.add(new Note(this.description.get()))
    return false
  }

  static randomPick<T>(arr: T[]): T {
    const index = randomInt(0, arr.length - 1)
    return arr[index]
  }

  static addToBackpack(player: Player, item: Item, fallback: () => void) {
    try {
      player.backpack.add(item)
    } catch (err) {
      Backpack.handleBackFullError(err, fallback)
    }
  }
}
