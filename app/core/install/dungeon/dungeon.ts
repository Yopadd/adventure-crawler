import { StringValidation } from '#app/core/validations/string-validation'

export default class Dungeon {
  constructor(
    public readonly name: DungeonName,
    public readonly events: DungeonEventName[] = []
  ) {}
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 150 })
  }
}

export enum DungeonEventName {
  LAVA = 'Lava',
}
