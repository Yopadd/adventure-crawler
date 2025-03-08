import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/events'
import { StringValidation } from '../../validations/string-validation.js'

export default class Adventure<T extends EventResolver = Player> {
  public readonly name: AdventureName

  constructor(
    name: string,
    private readonly events: AdventureEvent<T>[] = []
  ) {
    this.name = new AdventureName(name)
  }

  public resolve(resolver: T): Note[] {
    let notes: Note[] = []
    for (const index in this.events) {
      const event = this.events[index]
      const note = new Note(`Jour ${Number.parseInt(index) + 1}`)
      const resolution = event.resolve(resolver, note)
      notes.push(note)
      if (Resolution.EndOfAdventure === resolution) {
        break
      }
    }
    return notes
  }

  public get eventCount() {
    return this.events.length
  }
}

export class AdventureName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export enum Resolution {
  Continue,
  EndOfAdventure,
}

export interface AdventureEvent<T extends EventResolver> {
  description: AdventureEventDescription
  name: EventName
  resolve: (eventResolver: T, note: Note) => Resolution
}

export class AdventureEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 1000 })
  }
}
