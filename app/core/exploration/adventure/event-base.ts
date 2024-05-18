import ValidationError from '#app/core/errors/validation.error'
import {
  AdventureEvent,
  AdventureEventDescription,
} from '#app/core/exploration/adventure/adventure'
import Backpack from '#app/core/exploration/player/backpack/backpack'
import ExplorationItem from '#app/core/exploration/player/backpack/item/item'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/event'
import InstallItem from '#app/core/install/item/item'
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
    const index = randomInt(arr.length)
    return arr[index]
  }

  static addToBackpack(player: Player, item: InstallItem, fallback: () => void) {
    try {
      player.backpack.add(
        new ExplorationItem(item.name.get(), item.description.get(), Array.from(item.tags))
      )
    } catch (err) {
      Backpack.handleBackFullError(err, fallback)
    }
  }
}
