import { UseCase } from '../application'
import Player from '../player/player'

interface GetPlayerUseCaseInput {
  name: string
}

export interface GetPlayerUseCasePlayerService {
  getByName(name: string): Promise<Player>
}

export class GetPlayerUseCase implements UseCase<GetPlayerUseCaseInput, Promise<Player>> {
  constructor(private readonly playerService: GetPlayerUseCasePlayerService) {}

  public async apply(input: GetPlayerUseCaseInput): Promise<Player> {
    return this.playerService.getByName(input.name)
  }
}
