import { EventResolver } from 'App/Core/exploration/player/event-resolver'
import Note, { Comment } from 'App/Core/exploration/player/logbook/report/note/note'
import { PlayerScore } from 'App/Core/exploration/player/player'
import { StringValidation } from '../../validations/string-validation'

export default class Dungeon {
  constructor(public readonly name: DungeonName, public readonly events: DungeonEvent[] = []) {}

  public resolve(resolver: EventResolver): Note {
    return this.events.length
      ? new Note(new Comment(''), PlayerScore.Zero)
      : this.events.reduce((acc, event) => event.resolve(resolver).add(acc), Note.Empty)
  }
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface DungeonEvent {
  description: DungeonEventDescription
  name: DungeonEventName
  resolve: (player: EventResolver) => Note
}

export class DungeonEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}

export enum DungeonEventName {
  LAVA = 'Lava',
}
