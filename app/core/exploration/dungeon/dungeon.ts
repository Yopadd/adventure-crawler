import { EventResolver } from '#app/core/exploration/player/event-resolver'
import Note, { Comment } from '#app/core/exploration/player/logbook/report/note/note'
import { PlayerScore } from '#app/core/exploration/player/player'
import { StringValidation } from '../../validations/string-validation.js'

export default class Dungeon {
  constructor(
    public readonly name: DungeonName,
    public readonly events: DungeonEvent<EventResolver>[] = []
  ) {}

  public resolve(resolver: EventResolver): Note {
    return this.events.length > 0
      ? new Note(new Comment(''), PlayerScore.Zero)
      : this.events.reduce((acc, event) => event.resolve(resolver).add(acc), Note.Empty)
  }
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface DungeonEvent<T extends EventResolver> {
  description: DungeonEventDescription
  name: DungeonEventName
  resolve: (eventResolver: T) => Note
}

export class DungeonEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}

export enum DungeonEventName {
  LAVA = 'Lava',
}
