import { StringValidation } from 'App/Core/validations/string-validation'

export default class PlayerSheet {
  constructor(public readonly name: PlayerName, public readonly password: PlayerPassword) {}
}

export class PlayerName extends StringValidation {
  constructor(name: string) {
    super(name, {
      maxLength: 50,
    })
  }
}

export class PlayerPassword extends StringValidation {
  constructor(password: string) {
    super(password)
  }
}
