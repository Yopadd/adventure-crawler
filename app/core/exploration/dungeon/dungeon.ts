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
    return this.events.length === 0
      ? Note.Empty
      : this.events.reduce((acc, event) => event.resolve(resolver).add(acc, '\n'), Note.Empty)
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
  resolve: (eventResolver: T) => Note
}

export class DungeonEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 1000 })
  }
}
