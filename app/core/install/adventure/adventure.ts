import { EventName } from '#app/core/install/event/events'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Adventure {
  public readonly name: AdventureName

  constructor(
    name: string,
    public readonly events: EventName[] = []
  ) {
    this.name = new AdventureName(name)
  }
}

export class AdventureName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 250, spaces: false })
  }
}
