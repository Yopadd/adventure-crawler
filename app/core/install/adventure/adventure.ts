import { EventName } from '#app/core/install/event/events'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Adventure {
  public readonly name: AdventureName
  public events: EventName[] = []

  constructor(name: string) {
    this.name = new AdventureName(name)
  }

  setEvents(events: EventName[]) {
    this.events = events
    return this
  }
}

export class AdventureName extends StringValidation {
  constructor(name: string) {
    super(name, { maxLength: 250, spaces: false })
  }
}
