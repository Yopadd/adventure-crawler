import { UseCase } from '../application'
import Dungeon, { DungeonEvent } from 'App/Core/exploration/dungeon/dungeon'
import CrossingLavaRiver from 'App/Core/exploration/dungeon/events/crossing-lava-river'

export interface InitiateDungeonsUseCaseDungeonService {
  create(properties: DungeonEvent[]): Promise<Dungeon>
  countAll(): Promise<number>
}

interface InitiateDungeonsUseCaseInput {
  countOfDungeon: number
}

export default class InitiateDungeonsUseCase implements UseCase<InitiateDungeonsUseCaseInput> {
  constructor(private readonly dungeonsService: InitiateDungeonsUseCaseDungeonService) {}

  public async apply(input: InitiateDungeonsUseCaseInput) {
    const countOfExistingDungeons = await this.dungeonsService.countAll()
    for (let i = input.countOfDungeon - countOfExistingDungeons; i > 0; i--) {
      await this.dungeonsService.create([new CrossingLavaRiver()])
    }
  }
}
