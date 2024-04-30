import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/event'
import { StringValidation } from '../../validations/string-validation.js'

export default class Adventure<T extends EventResolver = Player> {
  constructor(
    public readonly name: AdventureName,
    public readonly events: AdventureEvent<T>[] = []
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

export class AdventureName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface AdventureEvent<T extends EventResolver> {
  description: AdventureEventDescription
  name: EventName
  resolve: (eventResolver: T, note: Note) => Note | undefined
}

export class AdventureEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 1000 })
  }
}
