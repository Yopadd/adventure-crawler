import { StringValidation } from '../../validations/string-validation'
import Player, { PlayerScore } from 'App/Core/exploration/player/player'

export default class Dungeon {
  constructor(public readonly name: DungeonName, public readonly events: DungeonEvent[] = []) {}
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 150 })
  }
}

export interface DungeonEvent {
  description: DungeonEventDescription
  name: DungeonEventName
  resolve: (player: Player) => PlayerScore
}

export class DungeonEventDescription extends StringValidation {
  constructor(description: string) {
    super(description, { maxLength: 300 })
  }
}

export enum DungeonEventName {
  LAVA = 'Lava',
}
