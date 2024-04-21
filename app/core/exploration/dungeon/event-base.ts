import ValidationError from '#app/core/errors/validation.error'
import { DungeonEvent, DungeonEventDescription } from '#app/core/exploration/dungeon/dungeon'
import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/event'
import { randomInt } from 'node:crypto'

export default abstract class EventBase<T extends EventResolver> implements DungeonEvent<T> {
  public readonly description: DungeonEventDescription

  protected constructor(
    public readonly name: EventName,
    description: string
  ) {
    try {
      this.description = new DungeonEventDescription(description)
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate "${this.name}" description has failed`, err)
      }
      throw err
    }
  }

  public resolve(_: T): Note {
    return Note.Empty
  }

  static RandomPick<T>(arr: T[]): T {
    const index = randomInt(0, arr.length - 1)
    return arr[index]
  }
}
