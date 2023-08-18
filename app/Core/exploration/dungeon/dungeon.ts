import { randomUUID } from 'crypto'
import { StringValidation } from '../../validations/string-validation'
import Player, { PlayerScore } from 'App/Core/exploration/player/player'

export default class Dungeon {
  public readonly id = randomUUID()

  constructor(public readonly events: DungeonEvent[] = []) {}
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
