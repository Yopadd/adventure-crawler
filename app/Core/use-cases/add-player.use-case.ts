import { UseCase } from '../application'
import Player from '../player/player'

interface AddPlayerUseCaseInput {
  name: string
  password: string
}

export interface AddPlayerUseCasePlayerService {
  create(name: string, password: string): Promise<Player>
}

export class AddPlayerUseCase implements UseCase<AddPlayerUseCaseInput, Promise<Player>> {
  constructor(private readonly playerService: AddPlayerUseCasePlayerService) {}

  public async apply(input: AddPlayerUseCaseInput): Promise<Player> {
    return this.playerService.create(input.name, input.password)
  }
}
