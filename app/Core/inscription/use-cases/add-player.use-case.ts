interface AddPlayerUseCaseInput {
  name: string
  password: string
}

export class AddPlayerUseCase {
  constructor() {}

  public async apply(input: AddPlayerUseCaseInput) {}
}
