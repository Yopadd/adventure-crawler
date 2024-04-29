import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/event'
import { StringValidation } from '../../validations/string-validation.js'

export default class Dungeon<T extends EventResolver = Player> {
  constructor(
    public readonly name: DungeonName,
    public readonly events: DungeonEvent<T>[] = []
  ) {}

  public resolve(resolver: T): Note {
    let note = Note.Empty
    if (this.events.length === 0) {
      return note
    }
    for (const index in this.events) {
      const event = this.events[index]
      const optionalNote = event.resolve(resolver, new Note(`Jour ${Number.parseInt(index) + 1}`))
      if (!optionalNote) {
        break
      }
      note.add(optionalNote, '\n')
    }
    return note
  }
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface DungeonEvent<T extends EventResolver> {
  description: DungeonEventDescription
  name: EventName
  resolve: (eventResolver: T, note: Note) => Note | undefined
}

export class DungeonEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 1000 })
  }
}
