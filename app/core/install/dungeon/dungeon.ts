import { EventName } from '#app/core/install/event/event'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Dungeon {
  public readonly name: DungeonName

  constructor(
    name: string,
    public readonly events: EventName[] = []
  ) {
    this.name = new DungeonName(name)
  }
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 250, spaces: false })
  }
}
