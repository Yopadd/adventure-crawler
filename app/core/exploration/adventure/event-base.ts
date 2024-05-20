import ValidationError from '#app/core/errors/validation.error'
import {
  AdventureEvent,
  AdventureEventDescription,
} from '#app/core/exploration/adventure/adventure'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/events'
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
}
